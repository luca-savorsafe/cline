import * as fs from "fs/promises"
import * as yaml from "js-yaml"
import * as path from "path"

import { ensureSkillsDirectoryExists } from "@/core/storage/disk"
import type { SkillContent, SkillMetadata } from "@/shared/skills"
import { fileExistsAtPath, isDirectory } from "@/utils/fs"

/**
 * Parse YAML frontmatter from markdown content.
 * Returns { data, content } similar to gray-matter.
 */
function parseFrontmatter(fileContent: string): { data: Record<string, unknown>; content: string } {
	const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/
	const match = fileContent.match(frontmatterRegex)

	if (!match) {
		return { data: {}, content: fileContent }
	}

	const [, yamlContent, body] = match
	const data = yaml.load(yamlContent) as Record<string, unknown>
	return { data: data || {}, content: body }
}

export class SkillsManager {
	private skills: SkillMetadata[] = []

	constructor(private cwd: string) {}

	async initialize(): Promise<void> {
		await this.discoverSkills()
	}

	/**
	 * Discover all skills from global and project directories.
	 * Project skills override global skills with the same name.
	 */
	async discoverSkills(): Promise<void> {
		this.skills = []

		const globalSkillsDir = await ensureSkillsDirectoryExists()
		const projectDirs = [
			path.join(this.cwd, ".clinerules", "skills"),
			path.join(this.cwd, ".claude", "skills"), // For portability with Claude skills
		]

		// Load global skills first (lower priority)
		await this.scanSkillsDirectory(globalSkillsDir, "global")

		// Load project skills (higher priority - will override global)
		for (const dir of projectDirs) {
			await this.scanSkillsDirectory(dir, "project")
		}
	}

	/**
	 * Scan a directory for skill subdirectories containing SKILL.md files.
	 */
	private async scanSkillsDirectory(dirPath: string, source: "global" | "project"): Promise<void> {
		if (!(await fileExistsAtPath(dirPath)) || !(await isDirectory(dirPath))) {
			return
		}

		try {
			const entries = await fs.readdir(dirPath)

			for (const entryName of entries) {
				const entryPath = path.join(dirPath, entryName)
				const stats = await fs.stat(entryPath).catch(() => null)
				if (!stats?.isDirectory()) continue

				await this.loadSkillMetadata(entryPath, source, entryName)
			}
		} catch {
			// Directory doesn't exist or can't be read - that's fine
		}
	}

	/**
	 * Load skill metadata from a skill directory.
	 */
	private async loadSkillMetadata(skillDir: string, source: "global" | "project", skillName: string): Promise<void> {
		const skillMdPath = path.join(skillDir, "SKILL.md")
		if (!(await fileExistsAtPath(skillMdPath))) return

		try {
			const fileContent = await fs.readFile(skillMdPath, "utf-8")
			const { data: frontmatter } = parseFrontmatter(fileContent)

			// Validate required fields
			if (!frontmatter.name || typeof frontmatter.name !== "string") {
				console.warn(`Skill at ${skillDir} missing required 'name' field`)
				return
			}
			if (!frontmatter.description || typeof frontmatter.description !== "string") {
				console.warn(`Skill at ${skillDir} missing required 'description' field`)
				return
			}

			// Name must match directory name per spec
			if (frontmatter.name !== skillName) {
				console.warn(`Skill name "${frontmatter.name}" doesn't match directory "${skillName}"`)
				return
			}

			this.skills.push({
				name: skillName,
				description: frontmatter.description,
				path: skillMdPath,
				source,
			})
		} catch (error) {
			console.warn(`Failed to load skill at ${skillDir}:`, error)
		}
	}

	/**
	 * Get available skills with override resolution (project > global).
	 */
	getAvailableSkills(): SkillMetadata[] {
		const seen = new Set<string>()
		const result: SkillMetadata[] = []

		// Process in reverse order so project skills (added last) override global
		for (let i = this.skills.length - 1; i >= 0; i--) {
			const skill = this.skills[i]
			if (!seen.has(skill.name)) {
				seen.add(skill.name)
				result.unshift(skill) // Maintain original order
			}
		}

		return result
	}

	/**
	 * Get full skill content including instructions.
	 */
	async getSkillContent(name: string): Promise<SkillContent | null> {
		const skill = this.getAvailableSkills().find((s) => s.name === name)
		if (!skill) return null

		try {
			const fileContent = await fs.readFile(skill.path, "utf-8")
			const { content: body } = parseFrontmatter(fileContent)

			return {
				...skill,
				instructions: body.trim(),
			}
		} catch {
			return null
		}
	}

	dispose(): void {
		this.skills = []
	}
}

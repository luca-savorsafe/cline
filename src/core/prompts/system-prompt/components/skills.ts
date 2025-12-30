import type { SkillMetadata } from "@/shared/skills"
import type { PromptVariant, SystemPromptContext } from "../types"

/**
 * Get a display-friendly relative path for a skill.
 */
function getDisplayPath(skill: SkillMetadata): string {
	if (skill.source === "global") {
		return `~/Documents/Cline/Skills/${skill.name}/SKILL.md`
	}
	// For project skills, show relative path
	if (skill.path.includes(".claude")) {
		return `.claude/skills/${skill.name}/SKILL.md`
	}
	return `.clinerules/skills/${skill.name}/SKILL.md`
}

/**
 * Generate the skills section for the system prompt.
 */
export async function getSkillsSection(_variant: PromptVariant, context: SystemPromptContext): Promise<string | undefined> {
	const skillsManager = context.skillsManager
	if (!skillsManager) return undefined

	const skills = skillsManager.getAvailableSkills()
	if (skills.length === 0) return undefined

	const skillsList = skills.map((skill) => `  - "${skill.name}": ${skill.description} [${getDisplayPath(skill)}]`).join("\n")

	return `SKILLS

The following skills provide specialized instructions for specific tasks. When a user's request matches a skill description, use the read_file tool to load the full SKILL.md file and follow its instructions.

Available skills:
${skillsList}

To use a skill:
1. Match the user's request to a skill based on its description
2. Use read_file to load the SKILL.md file from the path shown in brackets
3. Follow the instructions in the skill file
4. Access any bundled resources (scripts, templates) in the skill directory as needed`
}

import { StringRequest } from "@shared/proto/cline/common"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import mermaid from "mermaid"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { FileServiceClient } from "@/services/grpc-client"
import { useDebounceEffect } from "@/utils/useDebounceEffect"

const MERMAID_THEME = {
	background: "#1e1e1e", // VS Code 深色主题背景
	textColor: "#ffffff", // 主文本颜色
	mainBkg: "#2d2d2d", // 节点背景
	nodeBorder: "#888888", // 节点边框颜色
	lineColor: "#cccccc", // 连接线颜色
	primaryColor: "#3c3c3c", // 高亮主色
	primaryTextColor: "#ffffff", // 主色元素中的文本
	primaryBorderColor: "#888888",
	secondaryColor: "#2d2d2d", // 备用元素次色
	tertiaryColor: "#454545", // 特殊元素第三色

	// 类图特定
	classText: "#ffffff",

	// 状态图特定
	labelColor: "#ffffff",

	// 序列图特定
	actorLineColor: "#cccccc",
	actorBkg: "#2d2d2d",
	actorBorder: "#888888",
	actorTextColor: "#ffffff",

	// 流程图特定
	fillType0: "#2d2d2d",
	fillType1: "#3c3c3c",
	fillType2: "#454545",
}

mermaid.initialize({
	startOnLoad: false,
	securityLevel: "loose",
	theme: "dark",
	themeVariables: {
		...MERMAID_THEME,
		fontSize: "16px",
		fontFamily: "var(--vscode-font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif)",

		// 额外样式
		noteTextColor: "#ffffff",
		noteBkgColor: "#454545",
		noteBorderColor: "#888888",

		// 提高特殊元素的对比度
		critBorderColor: "#ff9580",
		critBkgColor: "#803d36",

		// 任务图特定
		taskTextColor: "#ffffff",
		taskTextOutsideColor: "#ffffff",
		taskTextLightColor: "#ffffff",

		// 数字/部分
		sectionBkgColor: "#2d2d2d",
		sectionBkgColor2: "#3c3c3c",

		// 序列图中的备用部分
		altBackground: "#2d2d2d",

		// 链接
		linkColor: "#6cb6ff",

		// 边框和线条
		compositeBackground: "#2d2d2d",
		compositeBorder: "#888888",
		titleColor: "#ffffff",
	},
})

interface MermaidBlockProps {
	code: string
}

export default function MermaidBlock({ code }: MermaidBlockProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(false)

	// 1) 每当 `code` 变化时，标记需要重新渲染新图表
	useEffect(() => {
		setIsLoading(true)
	}, [code])

	// 2) 防抖实际解析/渲染
	useDebounceEffect(
		() => {
			if (containerRef.current) {
				containerRef.current.innerHTML = ""
			}
			mermaid
				.parse(code, { suppressErrors: true })
				.then((isValid) => {
					if (!isValid) {
						throw new Error("Invalid or incomplete Mermaid code")
					}
					const id = `mermaid-${Math.random().toString(36).substring(2)}`
					return mermaid.render(id, code)
				})
				.then(({ svg }) => {
					if (containerRef.current) {
						containerRef.current.innerHTML = svg
					}
				})
				.catch((err) => {
					console.warn("Mermaid 解析/渲染失败：", err)
					containerRef.current!.innerHTML = code.replace(/</g, "<").replace(/>/g, ">")
				})
				.finally(() => {
					setIsLoading(false)
				})
		},
		500, // 延迟 500ms
		[code], // 调度依赖项
	)

	/**
	 * 用户点击渲染的图表时调用。
	 * 将 <svg> 转换为 PNG 并发送到扩展。
	 */
	const handleClick = async () => {
		if (!containerRef.current) {
			return
		}
		const svgEl = containerRef.current.querySelector("svg")
		if (!svgEl) {
			return
		}

		try {
			const pngDataUrl = await svgToPng(svgEl)
			FileServiceClient.openImage(StringRequest.create({ value: pngDataUrl })).catch((err) =>
				console.error("打开图像失败：", err),
			)
		} catch (err) {
			console.error("SVG 转换为 PNG 时出错：", err)
		}
	}

	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(code)
		} catch (err) {
			console.error("复制失败", err)
		}
	}

	return (
		<MermaidBlockContainer>
			{isLoading && <LoadingMessage>正在生成 Mermaid 图表...</LoadingMessage>}
			<ButtonContainer>
				<StyledVSCodeButton aria-label="复制代码" onClick={handleCopyCode} title="复制代码">
					<span className="codicon codicon-copy"></span>
				</StyledVSCodeButton>
			</ButtonContainer>
			<SvgContainer $isLoading={isLoading} onClick={handleClick} ref={containerRef} />
		</MermaidBlockContainer>
	)
}

async function svgToPng(svgEl: SVGElement): Promise<string> {
	console.log("svgToPng 函数被调用")
	// 克隆 SVG 以避免修改原始元素
	const svgClone = svgEl.cloneNode(true) as SVGElement

	// 获取原始 viewBox
	const viewBox = svgClone.getAttribute("viewBox")?.split(" ").map(Number) || []
	const originalWidth = viewBox[2] || svgClone.clientWidth
	const originalHeight = viewBox[3] || svgClone.clientHeight

	// 计算缩放因子以适合编辑器宽度，同时保持宽高比

	// 除非我们能找到通过 VS Code API 获取实际编辑器窗口尺寸的方法（可能可行但需要修改扩展端），
	// 否则固定宽度似乎是可靠的方法。
	const editorWidth = 3_600

	const scale = editorWidth / originalWidth
	const scaledHeight = originalHeight * scale

	// 更新 SVG 尺寸
	svgClone.setAttribute("width", `${editorWidth}`)
	svgClone.setAttribute("height", `${scaledHeight}`)

	const serializer = new XMLSerializer()
	const svgString = serializer.serializeToString(svgClone)
	const encoder = new TextEncoder()
	const bytes = encoder.encode(svgString)
	const base64 = btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""))
	const svgDataUrl = `data:image/svg+xml;base64,${base64}`

	return new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = () => {
			const canvas = document.createElement("canvas")
			canvas.width = editorWidth
			canvas.height = scaledHeight

			const ctx = canvas.getContext("2d")
			if (!ctx) {
				return reject("Canvas 上下文不可用")
			}

			// 用 Mermaid 深色主题背景色填充背景
			ctx.fillStyle = MERMAID_THEME.background
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			ctx.imageSmoothingEnabled = true
			ctx.imageSmoothingQuality = "high"

			ctx.drawImage(img, 0, 0, editorWidth, scaledHeight)
			resolve(canvas.toDataURL("image/png", 1.0))
		}
		img.onerror = reject
		img.src = svgDataUrl
	})
}

const MermaidBlockContainer = styled.div`
	position: relative;
	margin: 8px 0;
`

const ButtonContainer = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
	z-index: 1;
	opacity: 0.6;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 1;
	}
`

const LoadingMessage = styled.div`
	padding: 8px 0;
	color: var(--vscode-descriptionForeground);
	font-style: italic;
	font-size: 0.9em;
`

interface SvgContainerProps {
	$isLoading: boolean
}

const SvgContainer = styled.div<SvgContainerProps>`
	opacity: ${(props) => (props.$isLoading ? 0.3 : 1)};
	min-height: 20px;
	transition: opacity 0.2s ease;
	cursor: pointer;
	display: flex;
	justify-content: center;
`

const StyledVSCodeButton = styled(VSCodeButton)`
	padding: 4px;
	height: 24px;
	width: 24px;
	min-width: unset;
	background-color: var(--vscode-button-secondaryBackground);
	color: var(--vscode-button-secondaryForeground);
	border: 1px solid var(--vscode-button-border);
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;

	.codicon {
		font-size: 14px;
	}

	&:hover {
		background-color: var(--vscode-button-secondaryHoverBackground);
		border-color: var(--vscode-button-border);
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
`

import logo from "./robot_panel_dark.png"

/**
 * ClineLogoSanta component renders the Cline logo with a festive Santa hat
 * Includes automatic theme adaptation and environment-based color indicators.
 *
 * This festive version adds a Santa hat to the robot character while maintaining
 * the same theme and environment color system as ClineLogoVariable.
 *
 * @param {SVGProps<SVGSVGElement> & { environment?: Environment }} props - Standard SVG props plus optional environment
 * @returns {JSX.Element} SVG Cline logo with Santa hat that adapts to VS Code themes and environment
 */
const ClineLogoSanta = (props: any) => {
	return <img alt="Logo" src={logo} {...props} />
}
export default ClineLogoSanta

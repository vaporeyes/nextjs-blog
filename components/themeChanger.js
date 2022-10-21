import { useTheme } from 'next-themes'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    const lightButton = <button className="text-xs" onClick={() => setTheme('light')}>[LIGHTS: ON]</button>;
    const darkButton = <button className="text-xs" onClick={() => setTheme('dark')}>[LIGHTS: OFF]</button>;
    const colorTheme = theme === "dark" ? lightButton : darkButton;

    return (
        <div className="float-right">
            {colorTheme}
        </div>
    )
}

export default ThemeChanger;
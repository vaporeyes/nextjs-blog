import { useTheme } from 'next-themes'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()

    const lightButton = <button onClick={() => setTheme('light')}>☀️</button>;
    const darkButton = <button onClick={() => setTheme('dark')}>🌙</button>;
    const colorTheme = theme === "dark" ? lightButton : darkButton;

    return (
        <div className="float-right">
            {colorTheme}
        </div>
    )
}

export default ThemeChanger;
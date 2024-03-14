function themeSwitcher() {
    async function fetchThemeData() {
        try {
            const response = await fetch("https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata");
            if (!response.ok) {
                throw new Error("Failed to fetch theme data");
            }
            const data = await response.json();
            const root = document.documentElement;
            const theme = data.theme;
            for (const [key, value] of Object.entries(theme)) {
                root.style.setProperty(key, value);
            }
        } catch (error) {
            console.error("Error fetching theme data", error);
            applyDefaultTheme();
        }
    }

    function applyDefaultTheme() {
        const root = document.documentElement;
        root.style.setProperty('--background', 'hsl(0, 1%, 100%)');
        root.style.setProperty('--foreground', 'hsl(0, 0%, 40.4%)');
        root.style.setProperty('--primary', 'hsl(219, 69%, 48%)');
        root.style.setProperty('--primaryForeground', 'hsl(0, 0%, 100%)');
    }

    return { fetchThemeData };
}

export default themeSwitcher;

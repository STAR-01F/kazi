/**
 * Retrieves keywords for a given description.
 * @param description - The description for which to retrieve keywords.
 */
const getKeywords = async (description: string) => {
    console.log(import.meta.env.VITE_OPENAI_HOST);
    try {
        const response = await fetch(
            `${import.meta.env.VITE_OPENAI_HOST}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: description,
                }),
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not fetch keywords.');
        }
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return '';
    }
};

export default getKeywords;


export function generateRandomNoteData () {
    const randomNumber = Math.floor(Math.random() * 1000);
    return {
        heading: `Automated Random heading ${randomNumber}`,
        content: `Randomly generated "${randomNumber}" Automation testing content - Created at "${new Date().toISOString()}"`,
    };
}

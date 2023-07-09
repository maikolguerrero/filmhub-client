export const variants = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: ({ delay }) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay
        }
    })
}

export const variants2 = {
    hidden: {
        opacity: 0,
        x: -100
    },
    visible: ({ delay }) => ({
        opacity: 1,
        x: [-100, 100, 0],
        transition: {
            duration: 1,
            delay
        }
    }),
    hover: {
        scale: [1, 1.1, 0.9, 1],
        transition: { duration: 1.25, repeat: Infinity }
    }
}
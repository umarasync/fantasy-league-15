export const TOTAL_POINTS = 'total_points'
export const PRICE_FROM_HIGH_TO_LOW = 'price_from_high_to_low'
export const PRICE_FROM_LOW_TO_HIGH = 'price_from_low_to_high'
export const MOST_TRANSFERRED = 'most_transferred'

const filterOptions = [
    {
        name: 'Total points',
        value: TOTAL_POINTS
    },
    {
        name: 'Price (from high to low)',
        value: PRICE_FROM_HIGH_TO_LOW
    },
    {
        name: 'Price (from low to high)',
        value: PRICE_FROM_LOW_TO_HIGH
    },
    {
        name: 'Most transferred',
        value: 'most_transferred'
    },
]

export default filterOptions
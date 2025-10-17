// Mock data for development - Remove when backend is ready

export const mockProviders = [
    {
        id: 'p1',
        displayName: "Priya's Home Kitchen",
        bio: "Authentic North Indian home-style food with love",
        location: { area: 'Koramangala', city: 'Bangalore' },
        cuisineTypes: ['North Indian', 'Punjabi'],
        foodType: 'veg',
        priceRange: { min: 80, max: 150 },
        rating: 4.8,
        totalReviews: 24,
        currentTenants: 3,
        maxTenants: 5,
        mealsOffered: { lunch: { available: true }, dinner: { available: true } }
    },
    {
        id: 'p2',
        displayName: "Amma's Kitchen",
        bio: "Traditional South Indian cuisine, made with authentic spices",
        location: { area: 'Indiranagar', city: 'Bangalore' },
        cuisineTypes: ['South Indian'],
        foodType: 'veg',
        priceRange: { min: 70, max: 120 },
        rating: 4.9,
        totalReviews: 38,
        currentTenants: 4,
        maxTenants: 6,
        mealsOffered: { breakfast: { available: true }, lunch: { available: true }, dinner: { available: true } }
    },
    {
        id: 'p3',
        displayName: "Home Tiffin Service",
        bio: "Variety of cuisines, both veg and non-veg options",
        location: { area: 'Whitefield', city: 'Bangalore' },
        cuisineTypes: ['North Indian', 'Chinese', 'Continental'],
        foodType: 'both',
        priceRange: { min: 90, max: 180 },
        rating: 4.6,
        totalReviews: 15,
        currentTenants: 2,
        maxTenants: 4,
        mealsOffered: { lunch: { available: true }, dinner: { available: true } }
    },
];

export const mockProviderDetail = {
    id: 'p1',
    displayName: "Priya's Home Kitchen",
    bio: "Serving authentic North Indian home-style food with love and care. Using fresh ingredients and traditional recipes passed down through generations.",
    location: {
        address: '123, ABC Apartments',
        area: 'Koramangala',
        city: 'Bangalore',
        pincode: '560034'
    },
    cuisineTypes: ['North Indian', 'Punjabi', 'Rajasthani'],
    specialties: ['Homemade Parathas', 'Dal Tadka', 'Rajma Chawal', 'Paneer Butter Masala'],
    foodType: 'veg',
    mealsOffered: {
        lunch: { available: true, time: '12:00 PM - 2:00 PM' },
        dinner: { available: true, time: '7:00 PM - 9:00 PM' }
    },
    menuItems: [
        {
            mealType: 'lunch',
            items: ['4 Roti', 'Dal', 'Rice', 'Sabji', 'Salad'],
            description: 'Complete home-style lunch',
            price: 100,
            isVeg: true
        },
        {
            mealType: 'dinner',
            items: ['4 Roti/2 Paratha', 'Dal/Curry', 'Rice', 'Sabji', 'Pickle'],
            description: 'Wholesome dinner meal',
            price: 110,
            isVeg: true
        }
    ],
    priceRange: { min: 80, max: 150 },
    maxTenants: 5,
    currentTenants: 3,
    kycStatus: 'verified',
    rating: 4.8,
    totalReviews: 24,
    reviews: [
        {
            id: 'r1',
            tenantName: 'Rahul K.',
            rating: 5,
            comment: 'Excellent food quality! Tastes just like home-cooked meals.',
            date: '2024-11-15',
            aspects: { foodQuality: 5, hygiene: 5, punctuality: 5, behavior: 5 }
        }
    ]
};


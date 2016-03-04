"use strict";
exports.exampleDbConfig = {
    namespace: 'debugDb',
    initialState: [
        {
            key: 'debugMode',
            default: 'true',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: 'food',
            default: 'banana',
            storageType: 'sessionStorage',
            valueType: 'text'
        },
        {
            key: 'myPass',
            default: 'secret',
            storageType: 'localStorage',
            valueType: 'password'
        }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1kYi1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlLWRiLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQVcsdUJBQWUsR0FBRztJQUMzQixTQUFTLEVBQUUsU0FBUztJQUNwQixZQUFZLEVBQUU7UUFDWjtZQUNFLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLE1BQU07U0FDbEI7UUFDRDtZQUNFLEdBQUcsRUFBRSxNQUFNO1lBQ1gsT0FBTyxFQUFFLFFBQVE7WUFDakIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixTQUFTLEVBQUUsTUFBTTtTQUNsQjtRQUNEO1lBQ0UsR0FBRyxFQUFFLFFBQVE7WUFDYixPQUFPLEVBQUUsUUFBUTtZQUNqQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsVUFBVTtTQUN0QjtLQUNGO0NBQ0YsQ0FBQSJ9
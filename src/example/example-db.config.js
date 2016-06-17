"use strict";
exports.NAMESPACE = 'cbsExample';
exports.DEBUG_MODE = 'debugMode';
exports.OFFLINE_MODE = 'offlineMode';
exports.MY_PASS = 'myPass';
exports.HIDDEN_ITEM = 'hiddenItem';
exports.exampleDbConfig = {
    namespace: exports.NAMESPACE,
    initialState: [
        {
            key: exports.DEBUG_MODE,
            value: 'true',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: exports.OFFLINE_MODE,
            value: 'true',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: exports.MY_PASS,
            value: 'secret',
            storageType: 'localStorage',
            valueType: 'password'
        },
        {
            key: exports.HIDDEN_ITEM,
            value: 'notInUi',
            storageType: 'localStorage',
            valueType: 'text'
        }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1kYi5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlLWRiLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQWEsaUJBQVMsR0FBRyxZQUFZLENBQUE7QUFFeEIsa0JBQVUsR0FBRyxXQUFXLENBQUE7QUFDeEIsb0JBQVksR0FBRyxhQUFhLENBQUE7QUFDNUIsZUFBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixtQkFBVyxHQUFHLFlBQVksQ0FBQTtBQUUxQix1QkFBZSxHQUFHO0lBQzdCLFNBQVMsRUFBRSxpQkFBUztJQUNwQixZQUFZLEVBQUU7UUFDWjtZQUNFLEdBQUcsRUFBRSxrQkFBVTtZQUNmLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLE1BQU07U0FDbEI7UUFDRDtZQUNFLEdBQUcsRUFBRSxvQkFBWTtZQUNqQixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxjQUFjO1lBQzNCLFNBQVMsRUFBRSxNQUFNO1NBQ2xCO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsZUFBTztZQUNaLEtBQUssRUFBRSxRQUFRO1lBQ2YsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLFVBQVU7U0FDdEI7UUFDRDtZQUNFLEdBQUcsRUFBRSxtQkFBVztZQUNoQixLQUFLLEVBQUUsU0FBUztZQUNoQixXQUFXLEVBQUUsY0FBYztZQUMzQixTQUFTLEVBQUUsTUFBTTtTQUNsQjtLQUNGO0NBQ0YsQ0FBQSJ9
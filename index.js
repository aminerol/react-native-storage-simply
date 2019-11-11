/**
 * @overview Utilizing React native AsyncStorage Api in easier way when it comes for storing objects as well as arrays
 * @license MIT
 */
import { AsyncStorage } from 'react-native';
var _ = require('lodash');

class LocalStorage {

    /**
     * Get a one or more value for a key or array of keys from AsyncStorage
     * @param {String|Array} key A key or array of keys
     * @return {Promise}
     */
    async get(key) {
        try {
            if (!Array.isArray(key)) {
                const value = await AsyncStorage.getItem(key);
                const item = JSON.parse(value);
                return item
            } else {
                const values = await AsyncStorage.multiGet(key)
                return values.map(value => {
                    return JSON.parse(value[1]);
                });
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Save a key value pair or a series of key value pairs to AsyncStorage.
     * @param  {String|Array} key The key or an array of key/value pairs
     * @param  {Any} value The value to save
     * @return {Promise}
     */
    async save(key, value) {
        try {
            if (!Array.isArray(key)) {
                return await AsyncStorage.setItem(key, JSON.stringify(value));
            } else {
                var pairs = key.map(function(pair) {
                    return [pair[0], JSON.stringify(pair[1])];
                });
                return await AsyncStorage.multiSet(pairs);
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
     * @param  {String} key The key
     * @param  {Value} value The value to update with
     * @return {Promise}
     */
    async update(key, value) {
        try {
            const item = await this.get(key)
            value = typeof value === 'string' ? value : _.merge({}, item, value);
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Delete the value for a given key in AsyncStorage.
     * @param  {String|Array} key The key or an array of keys to be deleted
     * @return {Promise}
     */
    async delete(key) {
        try {
            if (Array.isArray(key)) {
                return await AsyncStorage.multiRemove(key);
            } else {
                return await AsyncStorage.removeItem(key);
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Get all keys in AsyncStorage.
     * @return {Promise} A promise which when it resolves gets passed the saved keys in AsyncStorage.
     */
    async keys() {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Push a value onto an array stored in AsyncStorage by key or create a new array in AsyncStorage for a key if it's not yet defined.
     * @param {String} key They key
     * @param {Any} value The value to push onto the array
     * @param {Boolean} [isExist=false] check existence before pushing onto array, if its false it wont check for existence 
     * @param {Function} [predicate] The function invoked per element.
     * @return {Boolean} returns wether the item pushed to the array or not
     */
    async push(key, value, isExist = false, predicate) {
        try {
            const currentValue = await this.get(key)
            if (currentValue === null) {
                // if there is no current value populate it with the new value
                await this.save(key, [value]);
                return Promise.resolve(true)
            }
            if (Array.isArray(currentValue)) {

                let exist = false
                if (isExist) {
                    if (predicate) {
                        exist = _.some(currentValue, (item) => predicate(item));
                    } else {
                        exist = _.some(currentValue, function(item) {
                            return item === value
                        });
                    }
                }
                if (!exist)
                {
                  await this.save(key, [...currentValue, value]);
                  return Promise.resolve(true)
                }else{
                  return Promise.resolve(false)
                }
            }
            return Promise.reject(new Error(`Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`));
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * update an item from an array stored in AsyncStorage, If the new value is an object it will be deep merged.
     * @param {String} key They key
     * @param {Any} value The value to look for to update from the array of string, if array of objects is the value to match with
     * @param {String|Array} [path] The path of the property to get.
     * @param {Any} newValue The new Value to be updated with
     * @return {Promise}
     */
    async set(key, value, path, newValue) {
        try {
            const currentValue = await this.get(key)

            if (currentValue === null) {
                return Promise.reject(new Error(`There is no Array with key "${key}" stored, received ${typeof currentValue}.`))
            }
            if (Array.isArray(currentValue)) {
                if (path) {
                    _.remove(currentValue, [path, value])
                } else {
                    _.remove(currentValue, function(v) {
                        return v === value;
                    })
                }
                currentValue.push(newValue)
                return await this.save(key, currentValue);
            }
            return Promise.reject(new Error(`Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`));
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * delete an item from an array stored in AsyncStorage by its value
     * @param {String} key They key
     * @param {Any} value The value to delete from the array of string, if array of objects is the value to match with
     * @param {String|Array} [path] The path of the property to get.
     * @return {Promise}
     */
    async pop(key, value, path) {
        try {
            const currentValue = await this.get(key)

            if (currentValue === null) {
                return Promise.reject(new Error(`There is no Array with key "${key}" stored, received ${typeof currentValue}.`));
            }
            if (Array.isArray(currentValue)) {
                if (path) {
                    _.remove(currentValue, [path, value])
                } else {
                    _.remove(currentValue, function(v) {
                        return v === value;
                    })
                }
                return await this.save(key, currentValue);
            }
            return Promise.reject(Error(`Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`));
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default new LocalStorage()
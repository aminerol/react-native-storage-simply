
# React Native AsyncStorage Simply

Utilizing React native AsyncStorage Api in easier way when it comes for storing objects as well as arrays for android and ios,

# Why?
not much of packages out there for AsyncStorage that compatible with Expo since am mostly using expo also for the case of arrays
 some functions are taken from other packages, and added some features to fit my needs

# Installing

```
npm install react-native-storage-simply --save
```

# API Reference

## Get

```js
get(key)
```
`get` Get a one or more value for a key or array of keys from AsyncStorage
* The `key` A key or array of keys

### Example

#### Simple Get
```js

import LocalStorage from 'react-native-storage-simply';
LocalStorage.get('todos').then(todos => {
    console.log(todos)
}).catch(error => {
    console.error(error);
});

```

#### Multi Get

```js

import LocalStorage from 'react-native-storage-simply';
LocalStorage.get(['todos', 'users']).then(results => {
    const todos = results[0]
    const users = results[1]
}).catch(error => {
    console.error(error);
});

```

## Save

```js
save(key, value)
```
`save` Save a key value pair or a series of key value pairs to AsyncStorage.
* The `key` The key or an array of key/value pairs
* The `value` The value to save

> Saving with same key will overwrite the old value

### Example

#### Simple Save
```js

import LocalStorage from 'react-native-storage-simply';

// save plain string
LocalStorage.save('todos', 'prove p = np').then(() => {
    console.log('saved')
}).catch(error => {
    console.error(error);
});

//save object
LocalStorage.save('todos', {id: 1, title: 'prove p = np'}).then(() => {
    console.log('saved')
}).catch(error => {
    console.error(error);
});

//save array of objects
LocalStorage.save('todos', [{id: 1, title: 'prove p = np'}]).then(() => {
    console.log('saved')
}).catch(error => {
    console.error(error);
});

```

#### Multi Save

```js

import LocalStorage from 'react-native-storage-simply';

// save plain string
LocalStorage.save([['todos', 'prove p = np'], ['users', 'nobody']]).then(() => {
    console.log('saved')
}).catch(error => {
    console.error(error);
});

//save object
LocalStorage.save([['todos', {id: 1, title: 'prove p = np'}], ['users', 'nobody']]).then(() => {
    console.log('saved')
}).catch(error => {
    console.error(error);
});

//save array of objects
LocalStorage.save(
[['todos', [{id: 1, title: 'prove p = np'}]], ['users', 'nobody']]).then(() => {
    console.log('saved')
}).catch(error => {
    console.error(error);
});
```

## Update

```js
update(key, value)
```
`get` Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
* The `key`  The key for the object that will be updated
* The `value`  The value to update with

### Example
```js

import LocalStorage from 'react-native-storage-simply';

// update plain string
LocalStorage.update('todos', 'NC = P').then(() => {
    console.log('updated')
}).catch(error => {
    console.error(error);
});

// update object if the property found with the new value
LocalStorage.update('todos', {id: 1, title: 'NC = P'}).then(() => {
    console.log('updated')
}).catch(error => {
    console.error(error);
});

// merge if the property not found in the object
LocalStorage.update('todos', {completed: false}).then(() => {
    console.log('updated')
}).catch(error => {
    console.error(error);
});

```

## Delete

```js
delete(key)
```
`delete` Delete the value for a given key in AsyncStorage.
* The `key`  key or an array of keys to be deleted

### Example
```js

import LocalStorage from 'react-native-storage-simply';

// delete a single object from the storage
LocalStorage.delete('todos').then(() => {
    console.log('deleted')
}).catch(error => {
    console.error(error);
});

// delete multiple objects from the storage
LocalStorage.delete(['todos', 'users']).then(() => {
    console.log('deleted')
}).catch(error => {
    console.error(error);
});
```

## Keys

```js
keys()
```
`keys` Get all keys in AsyncStorage

### Example
```js

import LocalStorage from 'react-native-storage-simply';

// delete a single object from the storage
LocalStorage.keys().then((keys) => {
    console.log(keys)
}).catch(error => {
    console.error(error);
});
```

## Push

```js
push(key, value, isExist = false, predicate)
```
`push` Push a value onto an array stored in AsyncStorage by key or create a new array in AsyncStorage for a key if it's not yet defined.
* The `key`  key that the array will be defined with
* The `value`  The value to push onto the array
* The `isExist`  Optional argument by default its false, check existence before pushing onto array, if its false it wont check for existence
* The `predicate`  Optional argument, The function invoked per element for checking the existence in case of nested objects

### Example
```js

import LocalStorage from 'react-native-storage-simply';

// push item into array without checking
LocalStorage.push('todos', {id: 1, title: 'N = NP'}).then(() => {
    console.log('added item to array')
}).catch(error => {
    console.error(error);
});

// push item into array with checking but without specifying the function for checking
LocalStorage.push('todos', 'N = NP', true).then(() => {
    console.log('added item to array')
}).catch(error => {
    console.error(error);
});

// push item into array with checking by passing a function to do the check
LocalStorage.push('todos', {id: 1, title: 'N = NP'}, true, item => item.id  === 1).then(() => {
    console.log('added item to array')
}).catch(error => {
    console.error(error);
});
```

## Set

```js
set(key, value, path, newValue)
```
`set` update an item from an array stored in AsyncStorage, If the new value is an object it will be deep merged.
* The `key`  key will be updated
* The `value`  The value to look for to update from the array of string, if array of objects is the value to match with
* The `path`  The path of the property to get
* The `newValue`  The new Value to be updated with

### Example
```js

import LocalStorage from 'react-native-storage-simply';

// update item if new value does not exist it will be merged otherwise will be updated with new value
LocalStorage.set('todos', 1, 'id', {completed: true}).then(() => {
    console.log('item updated')
}).catch(error => {
    console.error(error);
});

// update item for nested objects
LocalStorage.set('todos', 1, 'user.id', {name: 'nemo'}).then(() => {
    console.log('item updated')
}).catch(error => {
    console.error(error);
});

// update item for nested objects using array
LocalStorage.set('todos', 1, ['user', 'id'], {name: 'nemo'}).then(() => {
    console.log('item updated')
}).catch(error => {
    console.error(error);
});
```

## Pop

```js
pop(key, value, path)
```
`pop` delete an item from an array stored in AsyncStorage by its value
* The `key`  key will be removed
* The `value`  The value to delete from the array of string, if array of objects is the value to match with
* The `path`  The path of the property to get.

### Example
```js

import LocalStorage from 'react-native-storage-simply';

// delete item from array using id
LocalStorage.pop('todos', 1, 'id').then(() => {
    console.log('item deleted')
}).catch(error => {
    console.error(error);
});

// delete item from array for nested objects
LocalStorage.set('todos', 1, 'user.id').then(() => {
    console.log('item deleted')
}).catch(error => {
    console.error(error);
});

// delete item from array for nested objects using array
LocalStorage.set('todos', 1, ['user', 'id']).then(() => {
    console.log('item deleted')
}).catch(error => {
    console.error(error);
});
```
# API structure

- [API structure](#api-structure)
  - [GET](#get)
    - [getAllRecords](#getallrecords)
    - [getRecordsForYear](#getrecordsforyear)
    - [getRecordsFromMonthInYear](#getrecordsfrommonthinyear)
    - [getRecord](#getrecord)
    - [getRangeCount](#getrangecount)
  - [ADD](#add)
    - [addRecord](#addrecord)
  - [UPDATE](#update)
    - [updateRecord](#updaterecord)
  - [DELETE](#delete)
    - [removeRecord](#removerecord)

## GET

### getAllRecords

Returns all records

```ts
Object[]: getAllRecords()
```

### getRecordsForYear

Returns all records for the given year (YYYY)

```ts
Object[]: getRecordsForYear(String: year)
```

### getRecordsForMonthInYear

Returns all records for the given year (YYYY)

```ts
Object[]: getRecordsForMonthInYear(String: month, String: year)
```

### getRecord

Returns a single record for the the given day if available

```ts
Object: getRecord(String: day, String: month, String: year)
```

### getRangeCount

Count records within range.  
`startDate` and `endDate` are both strings in the format "YYYY-MM-DD"

```ts
Number: rangeCount(String: startDate, String: endDate)
```

## ADD

### addRecord

Add a record to the database.

```ts
Boolean: addRecord({
  Date: date, // YYYY-MM-DD
  String: content, // html content
  String[]: tags
})
```

## UPDATE

### updateRecord

Update a previously created record.  
Returns the modified record.

```ts
Object: updateRecord(Number: id)
```

## DELETE

### removeRecord

Delete a record from the database.  
Returns the removed record.

```ts
Object: removeRecord(Number: id)
```

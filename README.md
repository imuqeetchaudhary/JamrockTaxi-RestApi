# Jamrock Taxi Rest Api

## Backend deployment link

https://jamrock-taxi-restapi.herokuapp.com/

## Routes for User

### to register a new user

- user/register : post

```
{
    name:
    email:
    password:
}
```

### to login an existing user

- user/login :post

```
{
    email:
    password:
}
```

```
Admin Credentials:
email: abduliscoool@gmail.com
password 12345

User Cresentials
email: test1@gmail.com
password: 12345
```

### to view the profile of an authenticated user

- user/profile :post

## Routes to Vehicles

### to add a new vehicle

- vehicle/add :post

```
{
    image: formdata
    name:
    passengerCapacity:
    luggageCapacity:
    pricePerKM:
    isAvailable:
}
```

### to get a single vehicle

- vehicle/single :post

```
{
    vehicleId:
}
```

### to get all vehicles

- vehicle/all :get

### to update a vehicle

- vehicle/update :patch

```
{
    vehicleId:
    image: formdata
    name:
    passengerCapacity:
    luggageCapacity:
    pricePerKM:
    isAvailable:
}
```

## Routes to Extras

### to add a new extras

- extras/add :post

```
{
    name:
    description:
    price:
}
```

### to get a single extras

- extras/sinle :post

```
{
    extrasId
}
```

### to get all extras

- extras/all :get

### to update an extras

- extras/update :patch

```
{
    extrasId:
    name:
    description:
    price:
}
```

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

- user/profile :post (protected. token required)

## Routes to Vehicles

### to add a new vehicle

- vehicle/add :post (protected. token required)

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

- vehicle/single :post (protected. token required)

```
{
    vehicleId:
}
```

### to get all vehicles

- vehicle/all :get (protected. token required)

### to update a vehicle

- vehicle/update :patch (protected. token required)

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

- extras/add :post (protected. token required)

```
{
    name:
    description:
    price:
}
```

### to get a single extras

- extras/single :post (protected. token required)

```
{
    extrasId
}
```

### to get all extras

- extras/all :get (protected. token required)

### to get all extras by passing array

- extras/get-all-by-array :post (protected. token required)

```
{
    extrasId: []
}
```

### to update an extras

- extras/update :patch (protected. token required)

```
{
    extrasId:
    name:
    description:
    price:
}
```

## Routes for booking

### to add a new booking

- booking/add :post (protected. token required)

```
{
    pickupLocation:
    dropoffLocation:
    startDateTime: ("2021-07-15T15:30:00Z")
    returnDateTime: ("2021-07-15T15:30:00Z")
    distance:
    transferType:
    vehicleId:
    extrasId:
    extrasPrice:
    passengerName:
    passengerEmail:
    passengerNumber:
    totalPassengers:
    totalBags:
    pickupFlightNumber:
    returnFlightNumber:
}
```

### to change booking status after payment

- booking/confirm-payment :patch (protected. token required)

```
{
    bookingId:
}
```

### to get all-bookings of single user

-booking/all-bookings-of-single-user :get (protected. token required)

### to get single booking of single user

- booking/single-booking-of-single-user :post (protected. token required)

```
{
    bookingId:
}
```

### to get all bookings of all users

- booking/all-bookings-of-all-users :get (protected. token required)

### to update a booking

- booking/update :patch (protected. token required)

```
{
    bookingId:
    pickupLocation:
    dropoffLocation:
    startDateTime: ("2021-07-15T15:30:00Z")
    returnDateTime: ("2021-07-15T15:30:00Z")
    distance:
    transferType:
    vehicleId:
    extrasId:
    passengerName:
    passengerEmail:
    passengerNumber:
    totalPassengers:
    totalBags:
    pickupFlightNumber:
    returnFlightNumber:
    isCompleted:
}
```

### to delete a booking

- booking/delete :delete (protected. token required)

```
{
    bookingId
}
```

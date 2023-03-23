#### api routing mechanism is similar to paged based routing
#### api are associated with a route based on their file name
#### every api route exports a default function named as "handler"
#### handler function recieves "req" and "res" as its parameters
#### can cater to different request type (GET, POST, etc) by using req.method
#### we have also seen how to make use of dynamic routes in api
#### we have also made use of catch all routes scheme in api
#### also saw how to make a DELETE request from page
#### we also got to know why we should not make a internal api call for data which are already at our dispossal for use and thus avoid unneccessary roudtrip data delay thus improving performance
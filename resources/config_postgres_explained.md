Pool    vs      Client
- Use a pool if you have or expect to have multiple concurrent requests. 
- That is literally what it is there for = to provide a pool of re-usable open client instances 
- reduces latency whenever a client can be reused
- In that case you definitely do not want to call pool.end() when your query completes, 
    you want to reserve that for when your application terminates 
    because pool.end() disposes of all the open client instances. 
- Remember, the point is to keep up to a fixed number of client instances available.
- using the pool object, we connect to the database and use a client in that pool to execute a query:


$1 refers to the first argument, $2 to the second, and so on. 
If an argument is of a composite type, then the dot notation, 
    $1.name, can be used to access attributes of the argument.
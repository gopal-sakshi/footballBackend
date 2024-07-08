whatsapp IMI to chatbot
- messages from customer whatsapp are stored in db
- if no messages come from user for 5min, we have send message back to customer

APPROACH I
- we can poll db every 5min, to see "updatedAt" timestamp
    if it is more than 5min, then send message back to customer
- if there are 100 customers, we have to check 100 rows every 5 min

APPROACH II
- by default, when we receive msg from customer - we trigger a api call to customer after 5min (via setTimeout)
- but in the meanwhile, we get a msg from customer, we cancel that setTimeout and create a new setTimeout
- we store all that setTimeouts (for each customer) in a global variable

[
    { "custId": "ramos", "msg": "14" },
    { "custId": "luka", "msg": "15" },
    { "custId": "iniesta", "msg": "19" },
    { "custId": "luka", "msg": "16" },
    { "custId": "ramos", "msg": "14" },
    { "custId": "kroos", "msg": "10" },
    { "custId": "cr7", "msg": "24" },
    { "custId": "luka", "msg": "25" },
    { "custId": "benz", "msg": "34" },
    { "custId": "ramos", "msg": "14" },
    { "custId": "ramos", "msg": "27" },
    { "custId": "puyol", "msg": "29" } 
]

lets say, we recieved these many messages
ramos sends 14; save apiCall in timeout queue - to be executed after 5 seconds
luka sends 15; ditto
iniesta sends 19; ditto
luka sends 16; so, we remove previous entry for luka in timeout array and save this one
    meaing, we wont process "luka 15" ever
llly, only these messages will get published
    
    iniesta 19
    kroos 10
    cr7 24
    luka 25
    benz 34
    ramos 27
    puyol 29


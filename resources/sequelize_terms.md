Sequelize
- its an Object Relational Mapper (ORM) for Node.js
- lets us connect to a database & perform operations without writing raw SQL queries. 
- It abstracts SQL queries and makes it easier to interact with database models as objects.



npm i sequelize sequelize-cli multer            // install required packages
npx sequelize-cli init                          // setup sequelize

sequelize-cli options
- create model
    sequelize model:generate --name ModelName --attributes attribute1:datatype, attribute2:string, attribute3:datatype


------------------------------------------------------------------------------

sequelize create table options
`timestamps: false` == don't add the timestamp attributes (updatedAt, createdAt)
`paranoid: true`
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
`underscored: true`
    don't use camelcase for automatically added attributes but underscore style
    so updatedAt will be updated_at
`freezeTableName: true`
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
- tableName: 'my_very_custom_table_name'
    // define your own custom table's name

-------------------------------------------------------------------------------------------

After initializing Sequelize, we `don’t need to write CRUD` functions, Sequelize supports all of them:

create a new Tutorial:              create(object)
find a Tutorial by id:              findByPk(id)
get all Tutorials:                  findAll()
update a Tutorial by id:            update(data, where: { id: id })
remove a Tutorial:                  destroy(where: { id: id })
remove all Tutorials:               destroy(where: {})
find all Tutorials by title:        findAll({ where: { title: ... } })
---------------------------------------------------------------------------------------------

Sequelize model associations

One-to-One
One-to-Many
Many-to-Many


const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B);                                    // A HasOne B
A.belongsTo(B);                                 // A BelongsTo B
A.hasMany(B);                                   // A HasMany B
A.belongsToMany(B, { through: 'C' });           // A BelongsToMany B through the junction table C
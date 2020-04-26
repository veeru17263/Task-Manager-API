// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient

const {MongoClient,ObjectID} = require('mongodb')

const connectionurl = 'mongodb://127.0.0.1:27017'
const databasename = 'task-manager'

MongoClient.connect(connectionurl,{useNewUrlParser: true},(error,client) => {
        if(error)
        {
          return  console.log("unable to connect with mogodb")
        }

        const db = client.db(databasename)

        // db.collection('users').insertOne({
        //     Name: 'veeru',
        //     Age: 20
        // },(error,result) => {
        //     if(error)
        //     {
        //       return    console.log('Error while inserting data')
        //     }
            
        //     console.log(result.ops)

        // })

        // db.collection('users').insertMany([{
        //     Name: 'yadav',
        //     Age: 21
        // },{
        //     Name: 'Rao',
        //     Age: 22
        // }],(error,result) => {
        //     if(error)
        //     {
        //       return    console.log('Error while inserting data')
        //     }
            
        //     console.log(result.ops)

        // })

        // db.collection('tasks').insertMany([{
        //     description: 'playing csgo',
        //     completed: false
        // },{
        //     description: 'enjoying',
        //     completed: false
        //  },
        // {
        //    description: "clean house" ,
        //    completed: true
        // }],(error,result) => {
        //     if(error)
        //     {
        //       return    console.log('Error while inserting data')
        //     }
            
        //     console.log(result.ops)

        // })

        // db.collection('tasks').findOne({_id: new ObjectID("5e9052c25a355548c08e52d4")},(error,task) => {
        //         if(error)
        //         {
        //             return console.log('unable to connect with mongodb')
        //         }

        //         console.log(task)
        // })

        // db.collection('tasks').find({completed: false}).toArray((error,tasks) => {
        //     if(error)
        //     {
        //         return console.log('unable to connect with mongodb')
        //     }

        //     console.log(tasks)
        // })

        db.collection('tasks').updateMany({
            completed: false
        },{
            $set: {
                completed: true
            }
        }).then((result) => {
                console.log(result.modifiedCount)
        }).catch((error) => {
            console.log(error)
        })
})
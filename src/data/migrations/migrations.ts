import { BaseDatabase } from '../baseDatabase';
import { TABLE_USERS, TABLE_RECIPES, TABLE_FOLLOWS } from '../tableNames';
import users from './users.json';
import recipes from './recipes.json';
import follows from './follows.json';


export abstract class MigrationDataBase extends BaseDatabase {

   public static startMigration() {

      const createTables = async () => {
         await MigrationDataBase.connection.raw(`
            SET FOREIGN_KEY_CHECKS= 0;

               DROP TABLE IF EXISTS ${TABLE_USERS}, ${TABLE_RECIPES}, ${TABLE_FOLLOWS};

            SET FOREIGN_KEY_CHECKS= 1;
   
            CREATE TABLE IF NOT EXISTS ${TABLE_USERS}(
               id VARCHAR(255) PRIMARY KEY,
               name VARCHAR(255) NOT NULL,
               email VARCHAR(255) UNIQUE NOT NULL,
               password VARCHAR(255) NOT NULL,
               role ENUM("normal","admin") DEFAULT "normal",
               member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS ${TABLE_FOLLOWS}(
               user_follower_fk VARCHAR(255),
               user_followed_fk VARCHAR(255),
               FOREIGN KEY (user_follower_fk) REFERENCES ${TABLE_USERS}(id),
               FOREIGN KEY (user_followed_fk) REFERENCES ${TABLE_USERS}(id),
               PRIMARY KEY(user_follower_fk,user_followed_fk)
            );
            
            CREATE TABLE IF NOT EXISTS ${TABLE_RECIPES}(
               id VARCHAR(255) PRIMARY KEY,
               title VARCHAR(255) NOT NULL,
               description VARCHAR(8000) NOT NULL,
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               author_id_fk VARCHAR(255),
               FOREIGN KEY (author_id_fk) REFERENCES ${TABLE_USERS}(id)
            );   
       `)
            .then(() => {
               console.log(`Tables created successfully!`)
               insertData()
            })
            .catch((error: any) => console.log(error.sqlMessage || error.message))
      }

      const insertData = async () => {
         try {
            await MigrationDataBase.connection(`${TABLE_USERS}`)
               .insert(users)
               .then(() => console.log(`${TABLE_USERS} populated!`))
               .catch((error: any) => printError(error))

            await MigrationDataBase.connection(`${TABLE_FOLLOWS}`)
               .insert(follows)
               .then(() => console.log(`${TABLE_FOLLOWS} populated!`))
               .catch((error: any) => printError(error))


            await MigrationDataBase.connection(`${TABLE_RECIPES}`)
               .insert(recipes)
               .then(() => console.log(`${TABLE_RECIPES} populated!`))
               .catch((error: any) => printError(error))
        
         } catch (error: any) {
            console.log(error.sqlMessage || error.message)
         } finally {
            console.log("Ending connection!")

            return MigrationDataBase.connection.destroy()
         }
      }

      const printError = (error: any) => {
         console.log(error.sqlMessage || error.message)
      }

      createTables()

   }
}

MigrationDataBase.startMigration()
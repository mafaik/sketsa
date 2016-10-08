import SQLite from 'react-native-sqlite-storage';
import * as config from '../constants/config';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

var db;



function errorCB(err) {
    console.log("error: ",err);
    
}



export function getAccount(callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;
         
        var account = {};

        db.executeSql('SELECT * FROM account').then((results) => {
            
            
            var len = results[0].rows.length;

            if( len > 0 ) {
            
                for (let i = 0; i < len; i++) {
                    
                    let row = results[0].rows.item(i);
                    
                    account = row;
                }
            }

            db.close();
            callback(account);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function getAccountLogin(callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;
         
        var account = {};

        db.executeSql('SELECT * FROM account WHERE signin = 1').then((results) => {
            
            
            var len = results[0].rows.length;

            if( len > 0 ) {
            
                for (let i = 0; i < len; i++) {
                    
                    let row = results[0].rows.item(i);
                    
                    account = row;
                }
            }

            db.close();
            callback(account);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}


export function getAccountTemp(callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;
         
        var account = {};

        db.executeSql('SELECT * FROM account_temp_mobile').then((results) => {
            
            
            var len = results[0].rows.length;

            if( len > 0 ) {
            
                for (let i = 0; i < len; i++) {
                    
                    let row = results[0].rows.item(i);
                    
                    account = row;
                }
            }

            db.close();
            callback(account);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}


export function addAccount(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var account = {};

        db.executeSql(`INSERT INTO account (account_id, email, name, gcm_token, signin ) VALUES ( ${data.account_id}, '${data.email}', '${data.name}', '${data.gcm_token}' , 1 );`).then((results) => {
                        
            if( results[0].rowsAffected > 0)
            {
                db.executeSql(`DELETE FROM account_temp_mobile WHERE email = '${data.email}';`).then((results) => {
                    
                    if( results[0].rowsAffected > 0)
                    {
                        account = data;
                    }

                    db.close();
                    callback(account);

                }).catch((error) => { 
                    errorCB(error);
                });   
                
            }      
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function addAccountLogin(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var account = {};

        db.executeSql(`SELECT * FROM account WHERE account_id = ${data.account_id} ;`).then((results) => {

            var len = results[0].rows.length;

            if( len > 0 ) {
                
                db.executeSql(`UPDATE account SET signin = 1 WHERE account_id = ${data.account_id} ;`).then((results) => {
                        
                    if( results[0].rowsAffected > 0)
                    {
                         account = data;
                    }   

                    db.close();
                    callback(account);   
                    
                }).catch((error) => { 
                    errorCB(error);
                });
                
            }
            else
            {
                
                db.executeSql(`INSERT INTO account (account_id, email, name, gcm_token, signin ) VALUES ( ${data.account_id}, '${data.email}', '${data.name}', '${data.gcm_token}' , 1 );`).then((results) => {
                        
                    if( results[0].rowsAffected > 0)
                    {
                         account = data;
                    }   

                    db.close();
                    callback(account);   
                    
                }).catch((error) => { 
                    errorCB(error);
                });

            }

        }).catch((error) => { 
            errorCB(error);
        });

        
        
    }).catch((error) => {
        errorCB(error);
    });
}


export function addAccountTemp(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var account = {};

        db.executeSql(`INSERT INTO account_temp_mobile (account_temp_id, email, name) VALUES ( ${data.account_temp_id}, '${data.email}', '${data.name}' );`).then((results) => {
            
            
            if( results[0].rowsAffected > 0)
            {
                console.log(results[0]);
                account = { ...data, account_temp_mobile_id : results[0].insertId };
            }

            db.close();
            callback(account);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}


export function updateAccountTemp(id, data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var account = {};

        db.executeSql(`UPDATE account_temp_mobile SET account_temp_id = ${data.account_temp_id}, email = '${data.email}', name = '${data.name}' WHERE account_temp_mobile_id = ${id} ;`).then((results) => {
            
            
            if( results[0].rowsAffected > 0)
            {
                
                account = { ...data, account_temp_mobile_id : id };
            }

            db.close();
            callback(account);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function logout(account_id, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var id = 0;

        db.executeSql(`UPDATE account SET signin = 0 WHERE account_id = ${account_id} ;`).then((results) => {
                        
            if( results[0].rowsAffected > 0)
            {
               id = account_id 
            }      

            db.close();
            callback(id);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function getFollow(id, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;
         
        var ids = [];

        db.executeSql(`SELECT * FROM following WHERE account_id = ${id}`).then((results) => {
            
            
            var len = results[0].rows.length;

            if( len > 0 ) {
            
                for (let i = 0; i < len; i++) {
                    
                    let row = results[0].rows.item(i);
                    
                    ids.push(row.Kode_Unit);
                }
            }

            db.close();
            callback(ids);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}


export function addFollow(item, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var ids = [];

        db.executeSql(`INSERT INTO following (account_id, Kode_Unit, Unit) VALUES ( ${item.account_id}, '${item.Kode_Unit}', '${item.Unit}' );`).then((results) => {
            
            
            if( results[0].rowsAffected > 0)
            {
                ids.push(item.Kode_Unit);
            }

            db.close();
            callback(ids);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}


export function deleteFollow(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var id = 0;

        db.executeSql(`DELETE FROM following WHERE Kode_Unit = '${data.Kode_Unit}' AND account_id = ${data.account_id} ;`).then((results) => {
            
            
            if( results[0].rowsAffected > 0)
            {
                id = data.Kode_Unit;
            }

            db.close();
            callback(id);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function updateAddFollow(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var ids = [];
        var ids_temp = [];
        var values = '';
        
        if(data.length <= 0 )
        {
            callback(ids);
            return;
        }
        
        data.map((item,i) => {

            if( i > 0 )
            {
                values += `, `;
            }

            values += `( ${item.account_id}, '${item.Kode_Unit}', '${item.Unit}' )`;
            ids_temp.push(item.Kode_Unit);
        });

        db.executeSql(`INSERT INTO following (account_id, Kode_Unit, Unit) VALUES ${values} ;`).then((results) => {
        
            if( results[0].rowsAffected > 0)
            {
                ids = ids_temp;
            }

            //db.close();
            callback(ids);
                
        }).catch((error) => { 
            errorCB(error);
        });
            
    }).catch((error) => {
        errorCB(error);
    });
     
        
}


export function updateDeleteFollow(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var ids = [];
        var ids_temp = [];
        var values = '';
        var account_id = 0;
        
        if(data.length <= 0 )
        {
            callback(ids);
            return;
        }
        
        data.map((item,i) => {

            if( i > 0 )
            {
                values += `, `;
            }

            values += `${item.Kode_Unit}`;
            ids_temp.push(item.Kode_Unit);
            account_id = item.account_id;
            
        });

        db.executeSql(`DELETE FROM following WHERE account_id = ${account_id} AND Kode_Unit IN ( ${values} ) ;`).then((results) => {
        
            if( results[0].rowsAffected > 0)
            {
                ids = ids_temp;
            }

            db.close();
            callback(ids);
                
        }).catch((error) => { 
            errorCB(error);
        });
            
    }).catch((error) => {
        errorCB(error);
    });
     
        
}




export function getBookmarkIds(id, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;
         
        var ids = [];

        db.executeSql(`SELECT * FROM bookmark WHERE account_id = ${id} `).then((results) => {
            
            
            var len = results[0].rows.length;

            if( len > 0 ) {
            
                for (let i = 0; i < len; i++) {
                    
                    let row = results[0].rows.item(i);
                    
                    ids.push(row.Kode_Pengumuman);
                }
            }

            db.close();
            callback(ids);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function addBookmark(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var ids = [];

        db.executeSql(`INSERT INTO bookmark (Kode_Pengumuman, account_id) VALUES ( ${data.Kode_Pengumuman}, ${data.account_id} );`).then((results) => {
            
            
            if( results[0].rowsAffected > 0)
            {
                ids.push(parseInt(Kode_Pengumuman));
                db.close();
            }

            callback(ids);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}

export function deleteBookmark(data, callback)
{
    SQLite.openDatabase({name : 'data', createFromLocation : '~db/data.sqlite'}).then((DB) => {
        db = DB;

        var id = 0;

        db.executeSql(`DELETE FROM bookmark WHERE Kode_Pengumuman = ${data.Kode_Pengumuman} AND account_id = ${data.account_id} ;`).then((results) => {
            
            
            if( results[0].rowsAffected > 0)
            {
                db.close();
                id = Kode_Pengumuman;
            }

            callback(id);
            
        }).catch((error) => { 
            errorCB(error);
        });
        
    }).catch((error) => {
        errorCB(error);
    });
}


/*

export function addWishlists(produkid, callback)
{
    SQLite.openDatabase({name : appTypes.dbName, createFromLocation : 1}).then((DB) => {
        db = DB;
        db.executeSql('SELECT 1 FROM wishlists LIMIT 1').then(() =>{
            
            var produkidarr = [];

            db.executeSql('INSERT INTO wishlists (produkid) VALUES ('+produkid+');').then((results) => {
                
                
            }).catch((error) => { 
                errorCB(error);
            });;
        }).catch((error) =>{
            errorCB(error);
            
        });
    }).catch((error) => {
        errorCB(error);
    });
}

export function deleteWishlists(produkid, callback)
{
    SQLite.openDatabase({name : appTypes.dbName, createFromLocation : 1}).then((DB) => {
        db = DB;
        db.executeSql('SELECT 1 FROM wishlists LIMIT 1').then(() =>{
            
            var id = 0;

            db.executeSql('DELETE FROM wishlists WHERE produkid = '+produkid+';').then((results) => {
                
                if( results[0].rowsAffected > 0)
                {
                    db.close();
                    id = produkid;
                }
                callback(id);
            }).catch((error) => { 
                errorCB(error);
            });;
        }).catch((error) =>{
            errorCB(error);
            
        });
    }).catch((error) => {
        errorCB(error);
    });
}

*/




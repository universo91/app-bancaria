const express = require('express');
const { Op } = require('sequelize');
require('dotenv').config();

const { Clients, Accounts, AccountTypes } = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile );

app.use( express.urlencoded({ extended:false }));

app.use( express.static('public'));

app.get("/", (req, res) => {
    res.render('home.html');
});

// ACCOUNT TYPES
app.get("/account_types", async (req, res) => {
    let results = await AccountTypes.findAll({raw: true});
    res.render('account_types.html', { accountTypes: results });
});

app.post('/account_types/add', async(req, res) => {
    const result = await AccountTypes.create({
        "name": req.body.name,
        "description": req.body.description
    });
    
    res.redirect('/account_types');
});

app.get('/account_types/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description } = await AccountTypes.findByPk( id, {raw: true});
    res.render('partials/account_types/edit.html', { id, name, description} )
});

app.post('/account_types/update/:id', async (req, res) => {
    await AccountTypes.update({
        "name": req.body.name,
        "description": req.body.description
        }, {
        where: {
            id: req.params.id 
        }
    });
    res.redirect('/account_types');
});

app.get('/account_types/delete/:id', async (req, res) => {
    
    try {
        const client = await AccountTypes.findByPk( req.params.id );
        client.destroy();
        res.redirect('/account_types');
    } catch (error) {
        console.log( error ); 
    }    
});

// ACCOUNTS
app.get('/accounts', async (req, res) => {
    const clients = await Clients.findAll({raw: true});
    const accountTypes = await AccountTypes.findAll({raw: true});
    const accounts = await Accounts.findAll({include:[ {model: Clients}, {model: AccountTypes} ]});
    //console.log(JSON.stringify(accounts.map( account => account.get({plain: true}))));
    res.render('accounts.html', {clients, accountTypes, accounts} );
});

app.post('/accounts/add', async (req, res) => {
    await Accounts.create({
        "account_no": req.body.account_number,
        "client_id": req.body.client_id,
        "balance": req.body.balance,
        "type_id": req.body.type_id
    });
    //window.history.back(); // || window.history.go( -1 );
    res.redirect('/accounts');
});

app.get('/accounts/edit/:id', async (req, res) => {
    const account = await Accounts.findByPk( req.params.id, { include: [ {model: Clients}, {model: AccountTypes } ]});
    const clientId = await account.client_id;
    const typeId = await account.type_id;

    const clientSelect = await Clients.findByPk(clientId);
    
    const clientsAll = await Clients.findAll({
        where: {
            id: {
                [Op.ne]: clientId
            }
        }
    });

    const typeSelect = await AccountTypes.findByPk(typeId);

    const typesAll = await AccountTypes.findAll({
        where: {
            id: {
                [Op.ne]: typeId
            }
        }
    });    

    res.render('partials/accounts/edit.html', {account, clientSelect, clientsAll, typesAll, typeSelect});
});

app.post('/accounts/update/:id', async (req, res) => {
    await Accounts.update({
        client_id: req.body.client_id,
        type_id: req.body.type_id,
        account_no: req.body.account_number,
        balance: req.body.balance
        }, 
        {
            where: {
                id: {
                 [Op.eq]: req.params.id
                }
            }
        }
    );
    res.redirect('/accounts');
});

// CLIENTS

app.get("/clients", async (req, res) => {
    const clients = await Clients.findAll();
    res.render('clients.html', { clients }); 
});

app.get('/clients/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, telephone } = await Clients.findByPk( id , {raw: true});
    const client = {
        id,
        first_name
    };
    console.log(client.id);
    res.render('partials/clients/edit.html', {id, first_name, last_name, email, telephone } );    
});

app.post('/clients/update/:id', async (req, res) => {
    await Clients.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        telephone: req.body.telephone
     }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect('/clients');
});

app.post('/clients/add', async (req, res) => {
    await Clients.create({
        "first_name": req.body.firstname,
        "last_name": req.body.lastname,
        "email": req.body.email,
        "telephone": req.body.telephone
    });
    res.redirect('/clients');

})

app.get('/clients/delete/:id', (req, res) => {
    Clients.findByPk(req.params.id).then(function(client) {
        client.destroy();
      }).then((client) => {
        //res.status(200).send('borrado');
        res.redirect('/clients')
      });
 });

const PORT = process.env.PORT ;

app.listen( PORT, () => {
    console.log( 'servidor iniciado en el puerto ', PORT);
});
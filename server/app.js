const express = require("express"); 
const app = express(); 
const port = 3006; 
const cors = require("cors");

app.use(express.json({ limit: '10mb' }));     // padidintas photo upload limitas + sql confige taip pat padidintas

app.use(cors());

const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');

app.use(

express.urlencoded({

    extended: true,

})
);

app.use(express.json());

const con = mysql.createConnection({

host: "localhost",
user: "root",
password: "",
database: "bandomasis1",
});



// AUTH // 
const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {      // jeigu noriu tikrint tik admin, o fronta palikti visiems, istirnti visa front dali ir vietoj else if palikti tik - else ir next();
      next();
  } else { // front
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)


// Route
// app.get("/", (req, res) => {
//   res.send("Hello Barsukai!");
// });


// app.get("/admin/hello", (req, res) => {
//   res.send("Hello Admin!");
// });


// AR ILEIDZIA AR NE SPRENDZIA SHITAS //
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if(req.query.role === 'admin') {
    sql = `
    SELECT
    name, id
    FROM users
    WHERE session = ? AND role = ?
    `;
    requests =  [req.headers['authorization'] || '', req.query.role]
  } else {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
      requests =  [req.headers['authorization'] || '']
  }
  con.query(sql, requests, (err, result) => {   // req.query.role + AND role = ? (tik dabar ismeciau)
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok', result });
      }
  });
});


app.post("/login", (req, res) => {
  const key = uuid.v4();
  let us = req.body.user;
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key, });
      }
  });
});



//////////////////////////////////////////////
///////////////  FRONT SHOP  /////////////////

// GET PRODUCTS //    // pakeistas del filtro // ir adinau c.id AS cid //
// app.get("/products", (req, res) => {
//   let sql;
//   let requests;
//   // console.log(req.query['cat-id']);
//   if (!req.query['cat-id'] && !req.query['s']) {
//       sql = `
//       SELECT com.id AS com_id, com, p.id, c.id AS cid, price, p.title, c.title AS cat, in_stock, last_update AS lu, photo
//       FROM products AS p
//       LEFT JOIN cats AS c
//       ON c.id = p.cats_id
//       LEFT JOIN comments AS com
//       ON p.id = com.product_id
//       ORDER BY title
//       `;
//       requests = [];
//   } else if (req.query['cat-id']){
//       sql = `
//       SELECT com.id AS com_id, com, p.id, c.id AS cid, price, p.title, c.title AS cat, in_stock, last_update AS lu, photo
//       FROM products AS p
//       LEFT JOIN cats AS c
//       ON c.id = p.cats_id
//       LEFT JOIN comments AS com
//       ON p.id = com.product_id
//       WHERE p.cats_id = ?
//       ORDER BY title
//       `;
//       requests = [req.query['cat-id']];
//   } else {
//       sql = `
//       SELECT com.id AS com_id, com, p.id, c.id AS cid, price, p.title, c.title AS cat, in_stock, last_update AS lu, photo
//       FROM products AS p
//       LEFT JOIN cats AS c
//       ON c.id = p.cats_id
//       LEFT JOIN comments AS com
//       ON p.id = com.product_id
//       WHERE p.title LIKE ?
//       ORDER BY title
//       `;
//       requests = ['%' + req.query['s'] + '%'];
//   }
//   con.query(sql, requests, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//   });
// });

///////////////////////////////////////////////////////////////////////////////////

// GET ITEMS BE FILTRO //
app.get("/front/items", (req, res) => {
  const sql = `
  SELECT c.id, it.id, it.title AS title, color, color_hex, c.title AS cat, price, photo
  FROM items AS it
  LEFT JOIN cats AS c
  ON c.id = it.cats_id
  ORDER BY title
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


// GET CATS ??
app.get("/front/categories", (req, res) => {
  const sql = `
SELECT *
FROM cats
ORDER BY title
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


// GET ORDERS
app.get("/front/orders", (req, res) => {
  const sql = `
SELECT orders.id AS id, size, state, sum, com, users_id, item_id, i.title, i.color, i.color_hex, i.price, i.photo, i.cats_id
FROM orders
LEFT JOIN users AS u
ON u.id = orders.users_id
LEFT JOIN items AS i
ON i.id = orders.item_id
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// GET USERS
app.get("/front/users", (req, res) => {
  const sql = `
SELECT *
FROM users

`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


// app.get("/front/orders", (req, res) => {
//   const sql = `
// SELECT *
// FROM orders
// ORDER BY id

// `;
//   con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//   });
// });

app.post("/front/orders", (req, res) => {
  const sql = `
  INSERT INTO orders
  (size, com, users_id, item_id)
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [req.body.size, req.body.com, req.body.users_id, req.body.item_id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'New item created', type: 'success' } });
  });
});

//////////////////////////////////////////////
///////////////  BACK SHOP  //////////////////

// CREATE CAT //
app.post("/admin/categories", (req, res) => {
    const sql = `
    INSERT INTO cats
    (title)
    VALUES (?)
  `;

  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;   
    res.send({result, msg: {text: 'New category created', type: 'success'}});
  });
});


// GET CAT //
app.get("/admin/categories", (req, res) => {
    const sql = `
    SELECT *
    FROM cats
    ORDER BY title

  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

// DELETE CAT //
app.delete("/admin/categories/:id", (req, res) => {
  const sql = `
  DELETE FROM cats
  WHERE id = ?
`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;   
    res.send({ result, msg: { text: 'Category deleted', type: 'success' } });
  });
});

// EDIT CAT //
app.put("/admin/categories/:id", (req, res) => {
  const sql = `
  UPDATE cats
  SET title = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Category updated', type: 'success' } });
    });
});


// CREATE ITEM //
app.post("/admin/items", (req, res) => {
  const sql = `
  INSERT INTO items
  (title, color, color_hex, price, photo, cats_id)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.color, req.body.color_hex, req.body.price, req.body.photo, req.body.cat], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'New item created', type: 'success' } });
  });
});


// GET ITEMS //
app.get("/admin/items", (req, res) => {
  const sql = `
  SELECT it.id, it.title AS title, color, color_hex, c.title AS cat, price, photo
  FROM items AS it
  LEFT JOIN cats AS c
  ON c.id = it.cats_id
  ORDER BY title
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


// DELETE ITEMS//
app.delete("/admin/items/:id", (req, res) => {
  const sql = `
  DELETE FROM items
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Item deleted', type: 'success' } });
  });
});


// EDIT PRODUCTS //
app.put("/admin/items/:id", (req, res) => {
  const sql = `
  UPDATE items
  SET title = ?, color = ?, color_hex = ?, price = ?, photo = ?, order_id = ?, cats_id = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.color, req.body.color_hex, req.body.price, req.body.photo, req.body.order, req.body.cat, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Item updated', type: 'success' } });
  });
});


// delete/edit photo //
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE items
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Photo removed', type: 'success' } });
  });
});


// // Comments
// app.post("/comments", (req, res) => {
//   const sql = `
//   INSERT INTO comments
//   (com, product_id)
//   VALUES (?, ?)
//   `;
//   con.query(sql, [req.body.com, req.body.product_id, ], (err, result) => {
//       if (err) throw err;
//       res.send({ result });
//   });
// });


// // comments back get //
// app.get("/admin/comments", (req, res) => {
//   const sql = `
// SELECT com.id AS id, com, title
// FROM comments AS com
// INNER JOIN
// products AS p
// ON com.product_id = p.id
// ORDER BY p.title
// `;
//   con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//   });
// });


// // comments back delete //
// app.delete("/admin/comments/:id", (req, res) => {
//   const sql = `
//   DELETE FROM comments
//   WHERE id = ?
//   `;
//   con.query(sql, [req.params.id], (err, result) => {
//       if (err) throw err;
//       res.send({ result, msg: { text: 'Comment Deleted', type: 'success' } });
//   });
// });



app.listen(port, () => {

  console.log(`Alo - alo, Baločka Jonas klauso - ${port}`);
  });
  
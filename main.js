var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var pool = mysql.createPool({
    host: "db",
    port: 3306,
    user: "root",
    password: "123",
    database: "todo",
    connectionLimit: 4
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/tasks/list", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {

            res.status(500).end();
            return;
        }
        connection.query("select * from todo",
            function (err, results) {
                connection.release();
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                console.info(results);
                res.json(results);
            })
    })
});

app.put("/task/update", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return handleError(err, res);
        }
        connection.query("UPDATE todo SET done=? WHERE id=?", [req.body.done, req.body.id],
            function (err, results) {
                console.info("request body is"+JSON.stringify(req.body));
                connection.release();
                if (err) {
                    return handleError(err, res);
                }
                console.log(results);
                res.json(results);
            })
    })
});

app.delete("/task/delete", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('conn err');
            return handleError(err, res);
        }
        connection.query("DELETE FROM todo WHERE id=?", [req.body.id],
            function (err, results) {
                connection.release();
                if (err) {
                    return handleError(err, res);
                }
                console.log(results);
                res.json(results);
            })
    })
});

app.post("/task/save", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return handleError(err, res);
        }
        var task = {
            text: req.body['text'],
            dueDate: req.body.dueDate,
            dueTime: req.body.dueTime,
            priority: req.body.priority,
            done: 0
        };
        console.log('>>task: ' + JSON.stringify(task));
        connection.query("INSERT INTO todo SET ?",
            task,
            function (err, results) {
                connection.release();
                if (err) {
                    return handleError(err, res);
                }
                console.log(results);
                res.json(results);
            });
        //you wrote results in the WRONG PLACE. It should have been before the });
    })
});

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));

app.use(function (req, res) {
    console.info("FILE NOT FOUND IN PUBLIC: %s", req.originalUrl);
    res.redirect("/error.html");
});


var port = process.argv[2] || 3000;
app.set("port", port);[[]]
app.listen(app.get("port"), function () {
    console.info("Web server started on port %d", app.get("port"));
});


function handleError(err, res) {
    console.error(err);
    res.status(500).end();
};

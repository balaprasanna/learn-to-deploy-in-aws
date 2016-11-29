// import mysql module from node_modules.
var mysql = require("mysql");
var path = require("path");
var express = require("express");

// create a connection pool passing in connection info.
var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password@123",
    database: "employees",
    connectionLimit: 4
});

const  PORT = "port";
const GET_ALL_EMPLOYEES = "select emp_no, birth_date, first_name, last_name, gender, " +
    "hire_date " +
    "from employees LIMIT 2, 1";

const GET_ALL_EMPLOYEES_WHERE_FIRSTNAME_LIKE_AS = "select emp_no, birth_date, first_name, " +
    "last_name, gender, hire_date " +
    "from employees where first_name like ?"

// instantiate the express module to app object.
var app = express();

app.get("/api/employee/:emp_no", function(req, res){
    console.info(req);
    console.info(req.params.emp_no);
    pool.getConnection(function(err, connection) {
       if(err){
           res.status(400).send(JSON.stringify(err));
           return;
       }
       connection.query("select * from employees where emp_no=?", [req.params.emp_no],
           function(err, results){
               connection.release();
               if(err){
                   res.status(400).send(JSON.stringify(err));
                   return;
               }
               console.info(results);
               res.json(results[0]);
           }
       );
    });
});


app.get("/api/employees/firstname/:firstname_like", function(req, res){
    console.info(req);

    pool.getConnection(function(err, connection){
        if(err){
            res.status(400).send(JSON.stringify(err));
            return;
        }
        var firstname_like = "%" + req.params.firstname_like + "%";
        connection.query(GET_ALL_EMPLOYEES_WHERE_FIRSTNAME_LIKE_AS,[firstname_like],function(err, results){
            connection.release();
            if(err){
                res.status(400).send(JSON.stringify(err));
                return;
            }
            console.info(results);
            res.json(results);
        });
    });
});

app.get("/api/employees/searchFor/:age_criteria/:age", function(req, res){
    console.info(req.params.age_criteria);
    console.info(req.params.age);
    pool.getConnection(function(err, connection){
       if(err){
           res.status(400).send(JSON.stringify(err));
           return;
       }
        const GET_ALL_EMPS_AGE_FLITER = "select emp_no, birth_date, first_name, last_name,gender, hire_date, YEAR(CURDATE()) - YEAR(birth_date) as age " +
        "from employees where YEAR(CURDATE()) - YEAR(birth_date)";
        var sqlAgeCriteria = "";
        if(req.params.age_criteria == "gt"){
            sqlAgeCriteria = " > " + mysql.escape(req.params.age);
        }else if(req.params.age_criteria == "lt"){
            sqlAgeCriteria = " < " + mysql.escape(req.params.age);
        }else if(req.params.age_criteria == "eq"){
            sqlAgeCriteria = " = " + mysql.escape(req.params.age);
        }
        sqlAgeCriteria  = sqlAgeCriteria + " LIMIT 100";
        connection.query(GET_ALL_EMPS_AGE_FLITER + sqlAgeCriteria, [],function(err, results){
            connection.release();
            if(err){
                res.status(400).send(JSON.stringify(err));
                return;
            }
            console.info(results);
            res.json(results);
        });
    });

});

app.get("/api/employees/female2k", function(req, res){
    console.info("female y2k");
    const genderY2Ksql = "select * from employees where gender = 'F' AND YEAR(birth_date) < 2000";
    pool.getConnection(function(err, connection){
        if(err){
            res.status(400).send(JSON.stringify(err));
            return;
        }
        console.info(genderY2Ksql);
        connection.query(genderY2Ksql, [],function(err, results){
            connection.release();
            if(err){
                res.status(400).send(JSON.stringify(err));
                return;
            }
            console.info(results);
            res.json(results);
        });
    });
});

app.get("/api/employees/searchEmp/by/dept", function(req, res){
    console.info("Search Employees by Deaprtment");
    const searchEmpByDeptsql = "select e.first_name, e.last_name, p.dept_name from employees e, " +
        "departments p, dept_emp d where e.emp_no= d.emp_no AND p.dept_no = d.dept_no";
    pool.getConnection(function(err, connection){
        if(err){
            res.status(400).send(JSON.stringify(err));
            return;
        }
        connection.query(searchEmpByDeptsql,[],function(err, results){
            connection.release();
            if(err){
                res.status(400).send(JSON.stringify(err));
                return;
            }
            console.info(results);
            res.json(results);
        });
    });
});



app.get("/api/employees", function(req, res){
    console.info(req);
    pool.getConnection(function(err, connection){
        if(err){
            res.status(400).send(JSON.stringify(err));
            return;
        }
        connection.query(GET_ALL_EMPLOYEES,[],function(err, results){
            connection.release();
            if(err){
                res.status(400).send(JSON.stringify(err));
                return;
            }
            console.info(results);
            res.json(results);
        });
    });
});


app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));

app.set(PORT, process.argv[2] || process.env.APP_PORT || 3000);

app.listen(app.get(PORT) , function(){
    console.info("App Server started on " + app.get(PORT));
});

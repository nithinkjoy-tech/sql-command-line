const program = require("commander");
const _ = require("lodash");
const {Admin} = require("./models/admin");
const {Guest} = require("./models/guest");
const {find} = require("./query");
require("./startup/db")();

program.version("1.0.0").description("SQL query in MongoDB");

async function whereClause(keyVal,tableName){
  // if (args[3] == "where") {
    let operators = [">", ">=", "<", "<=", "=", "!="];
    let operatorPresent;
    let op = [];
    for (let operator of operators) {
      operatorPresent = _.includes(keyVal, operator);
      if (operatorPresent) {
        op.push(operator);
      }
    }
    if (op.length == 3) {
      op = [op[1]];
    }
    if (op.length == 2) {
      op = op[1];
    }
    if (op.length == 1) {
      op = op[0];
    }
    console.log(op);
    let [attribute, value] = keyVal.split(op);
    console.log(attribute, value, "ff");
    try {
      let result;
      let query = eval(_.capitalize(tableName)).find().where(attribute);
      if (op == operators[0]) result = await query.gt(value);
      if (op == operators[1]) result = await query.gte(value);
      if (op == operators[2]) result = await query.lt(value);
      if (op == operators[3]) result = await query.lte(value);
      if (op == operators[4]) result = await query.eq(value);
      if (op == operators[5]) result = await query.ne(value);

      console.log(result);
      process.exit();
    } catch (error) {
      console.log("Table not found");
      process.exit();
    }
  }


async function selectWhereClause(keyVal,tableName,select){
  // if (args[3] == "where") {
    let operators = [">", ">=", "<", "<=", "=", "!="];
    let operatorPresent;
    let op = [];
    for (let operator of operators) {
      operatorPresent = _.includes(keyVal, operator);
      if (operatorPresent) {
        op.push(operator);
      }
    }
    if (op.length == 3) {
      op = [op[1]];
    }
    if (op.length == 2) {
      op = op[1];
    }
    if (op.length == 1) {
      op = op[0];
    }
    console.log(op);
    let [attribute, value] = keyVal.split(op);
    console.log(attribute, value, "ff");
    try {
      let result;
      let query = eval(_.capitalize(tableName)).find().where(attribute);
      if (op == operators[0]) result = await query.gt(value).select(select);
      if (op == operators[1]) result = await query.gte(value).select(select);
      if (op == operators[2]) result = await query.lt(value).select(select);
      if (op == operators[3]) result = await query.lte(value).select(select);
      if (op == operators[4]) result = await query.eq(value).select(select);
      if (op == operators[5]) result = await query.ne(value).select(select);

      console.log(result);
      process.exit();
    } catch (error) {
      console.log("Table not found");
      process.exit();
    }
  }
// }


program
  .command("select")
  .argument("<args...>")
  .description("find")
  .action(async args => {
    if (args[0] == "*") {
      if (args[1] == "from") {
        if (!args[3]) {
          try {
            let result = await eval(_.capitalize(args[2])).find().lean();
            console.log(result);
            process.exit();
          } catch (error) {
            console.log("Table not found");
            process.exit();
          }
        }
        if (args[3] == "where") {
          whereClause(args[4],args[2])
        }
      }
    }

    if (args[0] == "distinct") {
      if (args[2] == "from") {
        console.log(args);
        try {
          let result = await eval(_.capitalize(args[3])).find().distinct(args[1]);
          console.table(result);
          process.exit();
        } catch (error) {
          console.log("Table not found");
          process.exit();
        }
      }
    }else{
      if (args[1] == "from") {
        console.log(args);
        let attributes=args[0].split(",")
        try {
          let result = await eval(_.capitalize(args[2])).find().select(attributes);
          console.log(result);
          process.exit();
        } catch (error) {
          console.log("Table not found");
          process.exit();
        }
      }else{
        let attributes=args.slice(0,args.indexOf("from"))
        if(args[attributes.length]=="from"){
          if(!args[attributes.length+2]){
            try {
              let result = await eval(_.capitalize(args[attributes.length+1])).find().select(attributes);
              console.log(result);
              process.exit();
            } catch (error) {
              console.log("Table not found");
              process.exit();
            }
          }else{
            console.log(args[attributes.length+3],args[attributes.length+1],"b")
            selectWhereClause(args[attributes.length+3],args[attributes.length+1],attributes)
          }
        }
      }
    }
    // if(star!=="*"||from!=="from") return console.log("Wrong query")
    // try {
    //     let result=await eval(_.capitalize(tableName)).find()
    //     console.log(result)
    // } catch (error) {
    //     console.log("Table not found")
    // }
    // console.log(col.indexOf("="),"er")
    // console.log(tableName, where, attributeValue);
  });

// program
//   .command("select")
//   .command("distinct")
//   .command("from")
//   .argument("<args...>")
//   .description("find")
//   .action(async args => {
//     // if(star!=="*"||from!=="from") return console.log("Wrong query")
//     try {
//       let result = await eval(_.capitalize(args)).find();
//       console.log(result);
//     } catch (error) {
//       console.log("Table not found");
//     }
//     // console.log(col.indexOf("="),"er")
//     // console.log(args)
//   });

// program
//     .command('select * from <name>')
//     .description('find')
//     .action(async(star, from, name)=>{
//         if(star!=="*"||from!=="from") return console.log("Wrong query")
//         try {
//             let result=await eval(_.capitalize(name)).find()
//             console.log(result)
//         } catch (error) {
//             console.log("Table not found")
//         }
//     })

program.parse(process.argv);

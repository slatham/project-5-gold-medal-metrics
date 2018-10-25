var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');
db.run('pragma journal_mode=off');
db.run('pragma temp_store = 2');
db.run('pragma SYNCHRONOUS = off');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {

 return 'CREATE TABLE Country \
          (name  TEXT NOT NULL, \
          code  TEXT NOT NULL, \
          gdp NUMERIC, \
          population  INTEGER)';

};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {

 return 'CREATE TABLE `GoldMedal` (\
  `id`  INTEGER NOT NULL,\
  `year`  TEXT NOT NULL,\
  `city`  TEXT NOT NULL,\
  `season`  TEXT NOT NULL,\
  `name`  TEXT NOT NULL,\
  `country` TEXT NOT NULL,\
  `gender`  TEXT NOT NULL,\
  `sport` TEXT NOT NULL,\
  `discipline`  TEXT NOT NULL,\
  `event` TEXT NOT NULL,\
  PRIMARY KEY(`id`)\
);'
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    

    return `SELECT count(*) from GoldMedal where country = '${country}';` 
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {

  return `select year, count(*) as count from GoldMedal where season = 'Summer' \
                                                      and country = '${country}'\ 
                                                      group by year \
                                                      order by count desc limit 1;`

  
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {

    return `select year, count(*) as count from GoldMedal where season = 'Winter' \
                                                      and country = '${country}'\ 
                                                      group by year \
                                                      order by count desc limit 1;`
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
      return `select year, count(*) as count from GoldMedal where country = '${country}'\ 
                                                      group by year \
                                                      order by count desc limit 1;`
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
    return `select discipline, count(country) as count from GoldMedal where country = '${country}' \
                                                    group by discipline \
                                                    order by count desc \
                                                    limit 1;`
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
      return `select sport, count(country) as count from GoldMedal where country = '${country}' \
                                                    group by sport \
                                                    order by count desc \
                                                    limit 1;`
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
      return `select event, count(country) as count from GoldMedal where country = '${country}' \
                                                    group by event \
                                                    order by count desc \
                                                    limit 1;`
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  return `select count (distinct name) as count from GoldMedal where gender = 'Men' and country = '${country}';`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  return `select count (distinct name) as count from GoldMedal where gender = 'Women' and country = '${country}';`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  return `select name, count(*) as count from GoldMedal where country = '${country}' group by name order by count desc limit 1;`
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
 

 let sql = `select * from GoldMedal where country = '${country}'`

 if (field) {

    sql = sql + ` order by ${field}`
    if (sortAscending) {
      sql = sql + ' asc'
    } else {
      sql = sql + ' desc'
    }
 }


 return sql;

};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
//debugger
  let sql = `select sport, count(sport) as count,
      round(count(sport) * 100 / (select count(*) from GoldMedal where country = '${country}') )as percent
      from GoldMedal where country = '${country}' group by sport`;

  if (field) {

    sql = sql + ` order by ${field}`
    if (sortAscending) {
      sql = sql + ' asc'
    } else {
      sql = sql + ' desc'
    }
    }

    return sql;

  
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};

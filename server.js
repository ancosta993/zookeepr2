const express = require('express');
const { animals } = require('./data/animals');

const app = express();

function filterByQuery(query, animalsArray) {
   let personalityTraitsArray = [];
   let filteredResults = animalsArray;
   if(query.personalityTraits) {
      // Save personalirtTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
         personalityTraitsArray = [query.personalityTraits]
      } else {
         personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
         filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
         );
      });
   }
   
   if (query.diet) {
     filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
   }
   if (query.species) {
     filteredResults = filteredResults.filter(animal => animal.species === query.species);
   }
   if (query.name) {
     filteredResults = filteredResults.filter(animal => animal.name === query.name);
   }
   return filteredResults;
};

function findById(id, animalsArray) {
   const result = animalsArray.filter(animal => animal.id === id)[0];
   return result;
}


app.get('/api/animals', (req, res) => {
   let results = animals;
   if (req.query) {
     results = filterByQuery(req.query, results);
   }
   res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
   const result = findById(req.params.id, animals);
   if (result) {
      res.json(result);
   } else {
      res.send(404);
   }
});

app.listen(3001, () => {
   console.log('API server now on port 3001!')
});

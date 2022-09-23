

// Challenge-1

// Approach : Iterate complete transactions list, while iterating if category of current transaction exists in 
// category list parameter then create an object in finalResponse with initial value 0. 

// If time condition satisfies then add/subtract the amount of that transaction in finalResponse object itself.

// Lastly put those categories in finalResponse object which are present in categories list parameter but not 
// in transactions list parameter with value 0.

const moment = require('moment');

const getBalanceByCategoryInPeriod = (
  transactions,
  categories,
  start,
  end
) => {
  // add your code here
  let currentCategory, transactionDate, finalResponse = {};
  transactions.forEach(singleTransaction => {
     // check if there is any category inside categories list matching the current transaction category
    if(categories.includes(singleTransaction.category)){
      currentCategory = singleTransaction.category;
      if(!finalResponse[currentCategory]){
        // add the category iff not exists in finalResponse object with value 0
        finalResponse[currentCategory] = 0;
      }
      transactionDate = moment(singleTransaction.time);
      if (transactionDate.isSameOrAfter(start) && transactionDate.isBefore(end)){
        // add or subtract the amount to the corresponding category in finalResponse object
        finalResponse[currentCategory] += singleTransaction.amount;
      }
    }
   })
  // add 0 if there are no transactions matching a category in specified period
    categories.forEach(singleCategory => {
    if(!finalResponse[singleCategory]){
      finalResponse[singleCategory] = 0;
    }
  });
  return finalResponse;
};

module.exports = getBalanceByCategoryInPeriod;

// Test-Cases
const getBalanceByCategoryInPeriod = require('./solution')

describe('getBalanceByCategoryInPeriod()', () => {
  // This is an example test. Please add your own tests if needed
  it('returns the correct balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['sports', 'entertainment'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).toEqual({ sports: -9200, entertainment: -13100 });
  });

  // add your tests here
  // Test Case 1
  it('returns the incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['eating_out'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).not.toEqual({ eating_out: -9000 });
  });
  
    // Test Case 2
  it('returns the incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['entertainment'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).not.toEqual({ entertainment: -13000 });
  });
    // Test Case 3
  it('returns the incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['sports'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).not.toEqual({ sports: -9000 });
  });
    // Test Case 4
  it('returns the incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['entertainment'],
        new Date('2021-05-01'),
        new Date('2021-05-30')
      )
    ).not.toEqual({ entertainment: -13100 });
  });
    // Test Case 5
  it('returns the incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['sports'],
        new Date('2021-05-01'),
        new Date('2021-05-30')
      )
    ).not.toEqual({ sports: -9200 });
  });
    // Test Case 6
  it('returns the correct balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['entertainment'],
        new Date('2021-05-01'),
        new Date('2021-05-30')
      )
    ).toEqual({ entertainment: 0 });
  });
    // Test Case 7
  it('returns the correct balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['sports'],
        new Date('2021-05-01'),
        new Date('2021-05-30')
      )
    ).toEqual({ sports: 0 });
  });
    // Test Case 8
  it('returns an empty object as category array is empty', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        [],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).toEqual({ });
  });
    // Test Case 9
  it('returns 0 if there are no transactions matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -9600,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -7400,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -9200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['travel'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).toEqual({ travel: 0 });
  });
});





// Challenge-2

// Approach : I created a dictionary with the target account as the lookup key & a list (sorted by amount) of all 
// transactions with that particular target account as the value. 

// While categorizing, iterate the list of transactions for that target account as the uncategorized transaction, 
// then do a binary search of the sorted list to find the transaction with less than 1000 value or the closest

// Binary Search : Used enhanced verion of Binary Search (it finds the index of target number, 
// if not present then the index of closed number)

const categorizeSimilarTransactions = (transactions) => {
    // add your code here
    let dictionary = {};  
  
    // Block-1
    //Creating a dictionary object of categorized transactions only with target account as key and a list of all transactions with that target account as the value. 
    transactions.forEach(current_Transaction => {
        // Check if category exists
        if (current_Transaction.category) {
            // If target account key doesn't exist in the dictionary so far then create else push
            if (!dictionary[current_Transaction.targetAccount]) {
                dictionary[current_Transaction.targetAccount] = [current_Transaction];
            } else {
                dictionary[current_Transaction.targetAccount].push(current_Transaction);
            }
        }
    });

    // Block-2
    // Sorting dictionary transactions by their amount
    for (let key of Object.keys(dictionary)) {
        dictionary[key].sort((a, b) => a.amount - b.amount);
    }

    // Block-3  
    // Iterate all uncategorized transactions & try to categorize them by looking into dictionary
    let closestIndex;
    transactions.forEach(current_Transaction => {
        // Check if category doesn't exist in transactions & exists in dictionary
        if (!current_Transaction.category && dictionary[current_Transaction.targetAccount]) {
            // binary search in dictionary & find target/closet index
            closestIndex = findClosestNumber(dictionary[current_Transaction.targetAccount], current_Transaction.amount);
          // if difference of closest index amount is <= 1000 then only assign that category  
          if (Math.abs(dictionary[current_Transaction.targetAccount][closestIndex].amount - current_Transaction.amount) <= 1000) {
                current_Transaction.category = dictionary[current_Transaction.targetAccount][closestIndex].category;
            }
        };
    });
  return transactions;
    
  // Time Complexity
  // Block-1
  // lets say length of transactions array is N, 
  // then time complexity of Block-1 is N
  
  // Block-2
  // lets say length of dictionary is D where D<N,
  // then time complexity of Block-2 is N-1 in worst case
  
  // Block-3
  // Time complexity of for loop lets say N & time complexity of binary search is log(N)
  // Total N*log(N)
  
  // Overall time complexity becomes N + N + N*log(N) ie O(N*log(N))
};

// Enhanced verion of Binary Search (it will find the index of target number, if not present then the index of closed number)
function findClosestNumber(array, target) {
    let arrayLength = array.length;

    // Corner cases
    if (target <= array[0].amount)
        return 0;
    if (target >= array[arrayLength - 1].amount)
        return arrayLength - 1;

    // Doing binary search
    let left = 0, right = arrayLength, midIndex= 0;
    while (left < right) {
        midIndex = Math.floor((left + right) / 2);
        if (array[midIndex].amount == target)
            return midIndex;

        if (target < array[midIndex].amount) {
            if (midIndex > 0 && target > array[midIndex - 1].amount) {
                if (target - array[midIndex - 1].amount >= array[midIndex].amount - target) return midIndex;
            }
            right = midIndex;
        } else {
            if (midIndex < arrayLength - 1 && target < array[midIndex + 1].amount) {
                if (target - array[midIndex].amount < array[midIndex + 1].amount - target) return midIndex;
            }
            left = midIndex + 1;
        }
    }
    return midIndex;
}

module.exports = categorizeSimilarTransactions

// Test-Cases
const categorizeSimilarTransactions = require('./solution')

describe('categorizeSimilarTransactions()', () => {
  // These are example tests. Please add your own tests if needed
  it('returns empty array if transactions is empty', () => {
    expect(categorizeSimilarTransactions([])).toEqual([]);
  });

  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1690,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });

  // add your tests here
  // Test Case-1
   it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: 650,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 650,
        category: 'eating_out',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-2
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: 2000,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'entertainment',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -100,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 2000,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'entertainment',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -100,
        category: 'entertainment',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });  
  
    // Test Case-3
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'toy_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'toy_shop',
          amount: -1690,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'toy_shop',
        amount: -620,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'toy_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-4
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          category: 'eating_out',
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'travel',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1690,
          category: 'entertainment',
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'travel',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        category: 'entertainment',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-5
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1690,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-6
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1690,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-7
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'tea_shop',
          amount: -350,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1690,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'tea_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-8
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -250,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'milk_shop',
          amount: -350,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'grocery_shop',
          amount: -150,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -250,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'milk_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'grocery_shop',
        amount: -150,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-9
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -620,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -350,
          category: 'dinening_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1690,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        category: 'dinening_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'dinening_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        category: 'dinening_out',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
    // Test Case-10
     it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: 100,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: 200,
          category: 'travel',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: 300,
          time: '2021-04-12T08:20:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: 400,
          time: '2021-05-12T08:20:00Z',
        }
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 100,
        category: 'travel',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 200,
        category: 'travel',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 300,
        category: 'travel',
        time: '2021-04-12T08:20:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 400,
        time: '2021-05-12T08:20:00Z',
      }
    ]);
  });
});

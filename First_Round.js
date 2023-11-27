

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

// 2nd

// First iterate transactions list along with category of current transaction. If it exists in categories then create an object with initial value 0 inside finalObject.
// Add/Subtract amount if transaction falls inside specified time frame in finalObject
// Push remaining categories (categories.category - finalObject.category) with amount 0 to finalObject

const moment = require('moment');

const getBalanceByCategoryInPeriod = (
  transactions,
  categories,
  start,
  end
) => {
  // add your code here

  // creating 3 empty objects
  let currentCategory, transactionDate, finalObject = {};

    transactions.forEach(transaction => {
        // To check if any category exists inside categories list that matches with current transaction category
        if (categories.includes(transaction.category)) {
            currentCategory = transaction.category;
            
            // Push this category with initial value 0, if it does not exist in finalObject
            if (!finalObject[currentCategory]) finalObject[currentCategory] = 0;
            
            transactionDate = moment(transaction.time);

            // Add/Subtract amount to the corresponding category in finalObject
            if (transactionDate.isSameOrAfter(start) && transactionDate.isBefore(end)) finalObject[currentCategory] += transaction.amount;
        }
    })

    // Push all other categories with amount 0 with no transaction matching
    categories.forEach(category => {
        if (!finalObject[category]) finalObject[category] = 0;
    });
    return finalObject;
};

module.exports = getBalanceByCategoryInPeriod;


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
  // Test case 1
  it('returns incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -1000,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -2000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -3000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -4000,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['sports'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).not.toEqual({ sports: -8000 });
  });
  
  // Test case 2
  it('returns the correct balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -500,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -3000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -3000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -1200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['entertainment'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).toEqual({ entertainment: -6000 });
  });
  
  // Test case 3
  it('returns incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -2000,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -16000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -14000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -12000,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['eating_out'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).not.toEqual({ eating_out: -17000 });
  });
  
  // Test case 4
  it('returns incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -1000,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -7000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -5000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -3000,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['entertainment'],
        new Date('2022-04-01'),
        new Date('2022-04-30')
      )
    ).not.toEqual({ entertainment: -12000 });
  });

  // Test case 5
  it('returns incorrect balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -7000,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -6000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -4000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -1000,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['sports'],
        new Date('2022-04-01'),
        new Date('2022-04-30')
      )
    ).toEqual({ sports: 0 });
  });
  
  // Test case 6
  it('returns the correct balance matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -1800,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -700,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -600,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -200,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['entertainment'],
        new Date('2022-04-01'),
        new Date('2022-04-30')
      )
    ).toEqual({ entertainment: 0 });
  });
  
  // Test case 7
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
  
  // Test case 8
  it('returns an empty object as there is nothing inside categories', () => {
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
  
  // Test case 9
  it('returns incorrect balance as there is nothing inside categories', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -18000,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -5000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -4000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -2000,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        [],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).not.toEqual({ sports: -2000 });
  });
  
  
  // Test case 10
  it('return 0 if there is no transaction matching a category in specified period', () => {
    expect(
      getBalanceByCategoryInPeriod(
        [
          {
            id: '11ff73b5-e771-441c-886a-498d93b5093d',
            sourceAccount: 'my_account',
            targetAccount: 'restaurant',
            amount: -1000,
            currency: 'EUR',
            category: 'eating_out',
            time: '2021-04-08T05:15:56.905Z',
          },
          {
            id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
            sourceAccount: 'my_account',
            targetAccount: 'cinema',
            amount: -3000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T21:16:57.819Z',
          },
          {
            id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
            sourceAccount: 'my_account',
            targetAccount: 'book_store',
            amount: -2000,
            currency: 'EUR',
            category: 'entertainment',
            time: '2021-04-07T22:46:44.071Z',
          },
          {
            id: '837127ab-f523-4b11-bed3-ae488be4545d',
            sourceAccount: 'my_account',
            targetAccount: 'fitness_club',
            amount: -5000,
            currency: 'EUR',
            category: 'sports',
            time: '2021-04-05T01:55:16.646Z',
          },
        ],
        ['education'],
        new Date('2021-04-01'),
        new Date('2021-04-30')
      )
    ).toEqual({ education: 0 });
  });
});


// create a big object with target a/c as key & list of all transactions associated with that a/c as value sorted by amount
// find transactions with <= 1000 or nearest using binary search
// try to categorize/enhance transactions with help of sorted big object & binary search

const categorizeSimilarTransactions = (transactions) => {
  // add your code here
  let categorizedTransactionsObject = {};

  // Check for categorized transactions only
  // Push an object with target a/c as key & list of all transactions associated with that target a/c as value
  transactions.forEach(transaction => {
    // Check for existance of category
    if (transaction.category) {
      // Create target a/c key if doesn't exist else just push it
      if (!categorizedTransactionsObject[transaction.targetAccount]) {
        categorizedTransactionsObject[transaction.targetAccount] = [transaction];
      } else {
        categorizedTransactionsObject[transaction.targetAccount].push(transaction);
      }
    }
  });

  // Sort the object transactions by amount
  for (let key of Object.keys(categorizedTransactionsObject)) {
    categorizedTransactionsObject[key].sort((transactionA, transactionB) => transactionA.amount - transactionB.amount);
  }

  // Run a loop on uncategorized transactions & attempt to categorize with help of categorizedTransactionsObject
  let nearestIndex;
  transactions.forEach(transaction => {
    // Check if a category does not exist in transation and exist in categorizedTransactionsObject
    if (!transaction.category && categorizedTransactionsObject[transaction.targetAccount]) {
      // Search categorizedTransactionsObject using binary search to find target number or nearest index
      nearestIndex = getNearestNumber(categorizedTransactionsObject[transaction.targetAccount], transaction.amount);
      // Assign category if difference of nearest index amount is <= 1000
      if (Math.abs(categorizedTransactionsObject[transaction.targetAccount][nearestIndex].amount - transaction.amount) <= 1000) {
        transaction.category = categorizedTransactionsObject[transaction.targetAccount][nearestIndex].category;
      }
    };
  });
  return transactions;  
};

// binary search to find target. will return the index of nearest number in case target isn't present.
function getNearestNumber(arr, target) {
  let arrLength = arr.length;

  if (target <= arr[0].amount) return 0;
  if (target >= arr[arrLength - 1].amount) return arrLength - 1;

  let left = 0, right = arrLength, mid = 0;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid].amount == target) return mid;

    if (target < arr[mid].amount) {
      if (mid > 0 && target > arr[mid - 1].amount) {
        if (target - arr[mid - 1].amount >= arr[mid].amount - target) return mid;
      }
      right = mid;
    } else {
      if (mid < arrLength - 1 && target < arr[mid + 1].amount) {
        if (target - arr[mid].amount < arr[mid + 1].amount - target) return mid;
      }
      left = mid + 1;
    }
  }
  return mid;
}

module.exports = categorizeSimilarTransactions


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
  // custom test case 1
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -700,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -900,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        category: 'eating_out',
        amount: -700,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -900,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1000,
        category: 'eating_out',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 2
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -5000,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -2000,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -5000,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -2000,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1000,
        category: 'eating_out',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 3
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -2000,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'travel_agent',
          amount: -5000,
          category: 'flight_tickets',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -2000,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'travel_agent',
        amount: -5000,
        category: 'flight_tickets',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1000,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 4
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -2000,
          category: 'eating_out',
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -3000,
          category: 'education',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -15000,
          category: 'entertainment',
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -2000,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -3000,
        category: 'education',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -15000,
        category: 'entertainment',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 5
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -900,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -800,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -900,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -800,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1000,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 6
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -2000,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'cafe_shop',
          amount: -3000,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'chicken_shop',
          amount: -4000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -2000,
        category: 'eating_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -3000,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -4000,
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 7
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -13000,
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -14000,
          category: 'dinning_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -12000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).not.toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -13000,
        category: 'dinning_out',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -14000,
        category: 'dinning_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -12000,
        category: 'dinning_out',
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
  
  // custom test case 8
  it('enhances categorization when there are similar transactions', () => {
    expect(
      categorizeSimilarTransactions([
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -5000,
          category: "travel",
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd6',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -10000,
          category: 'travel',
          time: '2021-04-10T10:30:00Z',
        },
        {
          id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -2000,
          category: 'eating_out',
          time: '2021-03-12T12:34:00Z',
        },
        {
          id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
          sourceAccount: 'my_account',
          targetAccount: 'coffee_shop',
          amount: -1000,
          time: '2021-04-12T08:20:00Z',
        },
      ])
    ).toEqual([
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -5000,
        category: 'travel',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd6',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -10000,
        category: 'travel',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -2000,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1000,
        category: "eating_out",
        time: '2021-04-12T08:20:00Z',
      },
    ]);
  });
});


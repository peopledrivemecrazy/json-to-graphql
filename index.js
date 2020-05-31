const { GraphQLServer } = require('graphql-yoga')
const fetch = require("node-fetch")

const typeDefs = `
type Query {
    hello(name: String): String!
    getCovid(country: String!):covid
  }
  type covid {
    country: String
    cases: Int
    todayCases: Int,
    deaths: Int,
    todayDeaths: Int,
    recovered: Int,
    active: Int,
    critical: Int,
    casesPerOneMillion: Int,
    deathsPerOneMillion: Int,
    totalTests: Int,
    testsPerOneMillion: Int
}

`
const baseURL = "https://coronavirus-19-api.herokuapp.com/countries/"
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    getCovid: async (_, {country}) => {
        const response = await fetch(`${baseURL}${country}`);
        return response.json()
    },
  },
}
 
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
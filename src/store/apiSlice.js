import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    // keepUnusedDataFor: 5,
    tagTypes:["Services", "Dogs"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) =>{
            headers.set("x-custom-header-global", Math.random());
            return headers;
        },
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) =>({
        getServices: builder.query({
            query: () => ({
                url: "/services",
                headers: {"x-custom-header": Math.random()},
            }),
        }),
        getService: builder.query({
            query: (id) => `/services/${id}`
        }),
        makeContact: builder.mutation({
            query: (body) => ({
                url: "contact",
                method: "POST",
                body
            })
        }),
        getDogs: builder.query({
            query:()=> "/dogs",
            transformResponse: (dogs) =>{
                //change this to reduce
                const allDogs = {}
                for (const id in dogs) {
                  const dog = dogs[id];
                  allDogs[id] = {
                    ...dog,
                    size: getSize(dog.weight),
                    age: getAge(dog.dob),
                  };
                }
                return allDogs;
            },
            providesTags: ["Dogs"]
        }),
        addDog: builder.mutation({
            query:(body) => ({
                url: "/dogs",
                method: "POST",
                body
            }),
            invalidatesTags: ["Dogs"],
        }),
        removeDog: builder.mutation({
            query:(id) => ({
                url: `/dogs/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Dogs"],
            onQueryStarted(id, { dispatch, queryFulfilled }){
                const update = dispatch(
                    api.util.updateQueryData("getDogs", undefined, (dogs) => {
                        delete dogs[id];
                    })
                );
                queryFulfilled.catch(()=>{
                    update.undo()
                })
            }
        })
    }),
});

export const {
    useGetServicesQuery, 
    useGetServiceQuery,
    useMakeContactMutation,
    useGetDogsQuery,
    useAddDogMutation,
    useRemoveDogMutation
} = api;

function getSize(weight) {
    weight = parseInt(weight, 10);
    if (weight <= 10) return "teacup";
    if (weight <= 25) return "small";
    if (weight <= 50) return "medium";
    if (weight <= 80) return "large";
    if (weight <= 125) return "x-large";
    return "jumbo";
}
  
const YEAR = 3.156e10;
function getAge(dob) {
    const date = +new Date(dob);
    return Math.floor((Date.now() - date) / YEAR);
}
  
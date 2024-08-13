const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            authToken: null, // State to hold the authentication token
            user: null // State to hold user data
        },
        actions: {
            // Action to handle user signup
            signup: async (email, password) => {
                try {
                    const response = await fetch('https://potential-happiness-x5r77j95v5g7364q6-3001.app.github.dev/api/Signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            email: email,
                            password: password,
                         })
                    });

                    if (response.ok) {
                        alert('Signup successful! Please log in.');
                        return true;
                    } else {
                        const errorData = await response.json();
                        alert('Signup failed: ' + errorData.msg);
                        return false;
                    }
                } catch (error) {
                    console.error('Error during signup:', error);
                    alert('An error occurred during signup.');
                    return false;
                }
            },

            // Action to handle user login
            login: async (email, password) => {
                try {
                    const response = await fetch('https://potential-happiness-x5r77j95v5g7364q6-3001.app.github.dev/api/login', { // Updated URL
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    });
            
                    if (response.ok) {
                        const { access_token } = await response.json(); // Use the correct variable name if it's different
                        sessionStorage.setItem('authToken', access_token); // Use the correct token key name if it's different
                        setStore({ authToken: access_token });
                        alert('Login successful!');
                        return true;
                    } else {
                        const errorData = await response.json();
                        alert('Login failed: ' + errorData.msg);
                        return false;
                    }
                } catch (error) {
                    console.error('Error during login:', error);
                    alert('An error occurred during login.');
                    return false;
                }
            },
            
            // Action to handle user logout
            logout: () => {
                sessionStorage.removeItem('authToken');
                setStore({ authToken: null, user: null });
                alert('You have been logged out.');
            },

            // Action to check if the user is authenticated
            checkAuthentication: () => {
                const token = sessionStorage.getItem('authToken');
                if (token) {
                    setStore({ authToken: token });
                    return true;
                } else {
                    return false;
                }
            },

            // Use getActions to call a function within a function
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;

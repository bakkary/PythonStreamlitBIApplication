
fetch('https://www.boredapi.com/api/activity/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("Finally promise fulfilled"));

console.log("After fetch promise");

async function getActivity()
{
    try
    {
        let response = await fetch('https://www.boredapi.com/api/activity/');
        let data = await response.json();
        console.log("getActivity: ", data);
    } catch (error)
    {
        console.error(error);
    } finally
    {
        console.log("Finally async promise fulfilled");
    }
}

getActivity();
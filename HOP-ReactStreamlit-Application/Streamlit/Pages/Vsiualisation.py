import pandas as pd
import streamlit.components.v1 as components
import streamlit as st
from pygwalker.api.streamlit import init_streamlit_comm, get_streamlit_html

st.set_page_config(page_title="PyGWalker Visualization", layout="wide", initial_sidebar_state="collapsed")

st.title("PyGWalker Visualization")

# Initialize PyGWalker communication
init_streamlit_comm()

@st.cache_resource
def get_pyg_html(df: pd.DataFrame) -> str:
    try:
        html = get_streamlit_html(df, use_kernel_calc=True, debug=False)
        return html
    except Exception as e:
        st.error(f"An error occurred while generating the visualization: {e}")
        return ""

# File upload section
uploaded_file = st.file_uploader("Upload a CSV file", type="csv")

if uploaded_file:
    # Process the uploaded file
    try:
        df = pd.read_csv(uploaded_file)
        st.success("File uploaded successfully!")
        st.dataframe(df)
    except Exception as e:
        st.error(f"Error reading the file: {e}")
        df = pd.DataFrame()  # Fallback to an empty DataFrame
else:
    st.warning("Please upload a CSV file to proceed.")
    df = pd.DataFrame()  # Fallback to an empty DataFrame





# Display PyGWalker visualization
if not df.empty:
    try:
        pyg_html = get_pyg_html(df)
        if pyg_html:
            # Set width to a large fixed value to simulate full screen
            components.html(
                pyg_html,
                width=1280,  # Set a fixed large width
                height=1000,
                scrolling=True
            )
    except Exception as e:
        st.error(f"An error occurred while rendering the visualization: {e}")
else:
    st.info("Upload a CSV file to see the visualization.")

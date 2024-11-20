import pandas as pd
import streamlit.components.v1 as components
import streamlit as st
from pygwalker.api.streamlit import init_streamlit_comm, get_streamlit_html

st.set_page_config(page_title="PyGWalker Visualization", layout="wide")

st.title("PyGWalker Visualization")

# Initialize PyGWalker communication
init_streamlit_comm()

@st.cache_resource
def get_pyg_html(df: pd.DataFrame) -> str:
    html = get_streamlit_html(df, spec="./gw0.json", use_kernel_calc=True, debug=False)
    return html

@st.cache_data
def get_sample_df() -> pd.DataFrame:
    return pd.read_csv("bike_sharing_dc.csv")

# Select data source
uploaded_file = st.file_uploader("Upload a CSV file", type="csv")
if uploaded_file:
    df = pd.read_csv(uploaded_file)
    st.write("Using uploaded dataset:")
    st.dataframe(df)
else:
    st.write("Using sample dataset:")
    df = get_sample_df()
    st.dataframe(df)

# Display PyGWalker visualization
components.html(get_pyg_html(df), width=1300, height=1000, scrolling=True)

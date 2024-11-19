import streamlit as st
import pandas as pd

import streamlit as st

st.set_page_config(page_title="Streamlit Demo", layout="wide")


st.title("Streamlit Demo: Dataset Import and Interaction")

uploaded_file = st.file_uploader("Upload a CSV file", type="csv")

if uploaded_file:
    df = pd.read_csv(uploaded_file)
    st.write("Data Preview:")
    st.dataframe(df)
    st.write("Summary Statistics:")
    st.write(df.describe())
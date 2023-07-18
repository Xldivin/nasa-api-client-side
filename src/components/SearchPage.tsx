import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Grid, Paper, Typography } from "@mui/material";
import DetailsPage from "./DetailsPage";
import CircularProgress from '@mui/material/CircularProgress';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (!searchTerm) {
        return;
      }

      const queryParams = {
        q: searchTerm,
        media_type: "image",
      };

      const response = await axios.get("https://images-api.nasa.gov/search", {
        params: queryParams,
      });

      const searchResultsData: SearchResult[] = response.data.collection.items.map(
        (item: any) => ({
          title: item.data[0].title,
          description: item.data[0].description,
          location: item.data[0].location,
          photographer: item.data[0].photographer,
          thumbnail: item.links[0].href,
          showPageLink: item.links[0].href,
          keywords:item.data[0].keywords,
          date_created: item.data[0].date_created
        })
      );

      setSearchResults(searchResultsData);
      setLoading(false);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleViewDetails = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const handleGoBack = () => {
    setSelectedResult(null);
  };

  if (selectedResult) {
    // Show the DetailsPage if a search result is selected
    return (
      <DetailsPage result={selectedResult} onGoBack={handleGoBack} />
    );
  }

  return (
    <Box m={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Search Term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSearch}>
          {loading ? <CircularProgress  sx={{width:"1rem",height:"1rem", color:"#fff"}}/>  : "Search" }
          </Button>
        </Grid>
      </Grid>

      {searchResults.length > 0 && (
        <Box mt={4} style={{ minHeight: "400px", minWidth: "300px" }}>
          <Grid container spacing={2}>
            {searchResults.map((result, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Paper>
                  <Box p={2}>
                    <Box style={{ maxHeight: "200px", overflow: "hidden" }}>
                      <img
                        src={result.thumbnail}
                        alt={result.title}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Box>
                    <Typography variant="subtitle1">{result.title}</Typography>
                    <Typography variant="body2">
                      Location: {result.location  || "Not Available"}
                    </Typography>
                    <Typography variant="body2">
                    Photographer: {result.photographer || "Not Available"}
                    </Typography>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleViewDetails(result)} // Handle click to view details
                    >
                        View More
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;

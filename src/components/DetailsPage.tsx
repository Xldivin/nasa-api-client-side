import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface DetailsPageProps {
  result: SearchResult;
  onGoBack: () => void;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ result, onGoBack }) => {
    const formattedDate = new Date(result.date_created).toLocaleDateString();
    const locationText = result.location || 'Location not available';
    const photographerText = result.photographer || 'Photographer not available';
    const keywordsText = result.keywords && result.keywords.length > 0 ? result.keywords.map((keyword, index) => (
        <Typography variant="body2" key={index}>
          Keyword {index + 1}: {keyword}
        </Typography>
    )) : 'No keywords';
  return (
    <Box m={2}>
      <Button variant="outlined" onClick={onGoBack}>
        Go Back
      </Button>
      <Box mt={2}>
        <img
          src={result.thumbnail}
          alt={result.title}
          style={{ maxWidth: "100%" }}
        />
      </Box>
      <Typography variant="h5">{result.title}</Typography>
      <Typography variant="body1">{result.description}</Typography>
      <Typography variant="body2">Location: {locationText}</Typography>
      <Typography variant="body2">
        Photographer: {photographerText}
      </Typography>
      <Typography variant="body2">Date: {formattedDate}</Typography>
      {keywordsText}
    </Box>
  );
};

export default DetailsPage;

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageCarousel from "../../ui/image-carousel";

const AccordionComponent = ({ recipe }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>{recipe.description}</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Images</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ImageCarousel images={recipe.images} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, i) => (
                <li key={ingredient + i}>{ingredient}</li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            {recipe.instructions &&
              recipe.instructions.map((instruction, i) => (
                <li key={instruction + i}>{instruction}</li>
              ))}
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>Notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            {recipe.notes &&
              recipe.notes.map((note) => <li key={note}>{note}</li>)}
          </ol>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;

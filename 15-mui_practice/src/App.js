import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <Box>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form">
            <FormControl component="fieldset">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    name="email"
                    id="email"
                    label="이메일 주소"
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              <Button type="submit">회원가입</Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;

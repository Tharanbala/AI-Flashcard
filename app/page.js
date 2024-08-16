'use client';

import { Container, Box, Typography, AppBar, Toolbar, Button, Grid } from '@mui/material'
import { SignedIn, SignedOut, UserButton  } from '@clerk/nextjs'
import getStripe from '@/utils/get-stripe';

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Container maxWidth='lg'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{mt: 2}} href="https://medium.com/@billzhangsc/creating-a-flashcard-saas-with-openai-and-stripe-7896ddea1dbb">
          Learn More
        </Button>
        <Box sx={{my: 6}}>
          <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
            <Grid container spacing={4}>
              {/* Feature items */}
            </Grid>
        </Box>
        <Box sx={{my: 6, textAlign: 'center'}}>
          <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
            <Grid container spacing={4} justifyContent="center">
              <Button variant="contained" color="primary" sx={{mt: 5, ml: 5}} onClick={handleSubmit}>
                Subscribe to our Pro version
              </Button>
            </Grid>
        </Box>
      </Box>
    </Container>
  );
}

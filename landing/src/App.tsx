import { Box, Button, Container, Grid, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function App() {
    const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
    return (
        <Box
            component={Grid}
            container
            width={'100vw'}
            height={'100vh'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                    'radial-gradient(circle, hsla(163, 100%, 93%, 1) 0%, hsla(190, 58%, 85%, 1) 0%, hsla(167, 86%, 92%, 1) 0%, hsla(213, 59%, 72%, 1) 100%);',
            }}>
            <Container
                component={Grid}
                container
                width={'100%'}
                maxWidth={'xs'}
                height={'100vh'}
                direction={'column'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Box
                    component={'img'}
                    src='/kazi.png'
                    height={'100px'}
                    mb={5}
                />
                <Container
                    component={Grid}
                    container
                    width={'100%'}
                    mb={5}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    <Typography variant='h6' fontWeight={'bold'}>
                        Simplify
                    </Typography>
                    <Typography variant='h6' fontWeight={'bold'}>
                        ּ•
                    </Typography>
                    <Typography variant='h6' fontWeight={'bold'}>
                        Track
                    </Typography>
                    <Typography variant='h6' fontWeight={'bold'}>
                        ּ•
                    </Typography>
                    <Typography variant='h6' fontWeight={'bold'}>
                        Succeed
                    </Typography>
                </Container>
                <Container
                    component={Grid}
                    container
                    width={'100%'}
                    mb={10}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    <Typography textAlign={'justify'}>
                        Unlock your career's full potential with Kazi.
                    </Typography>
                </Container>
                <Container
                    component={Grid}
                    container
                    width={'100%'}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    <Button
                        startIcon={<OpenInNewIcon />}
                        LinkComponent={'a'}
                        href={siteUrl}
                        variant='contained'>
                        Explore Beta
                    </Button>
                </Container>
            </Container>
        </Box>
    );
}

export default App;

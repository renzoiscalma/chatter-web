import Box from '@mui/material/Box';
import Video from '../Video/Video';
import Chatter from '../Chatter/Chatter';
import { SxProps } from '@mui/system';
import { createContext, useState } from 'react';

export const UserContext = createContext({
	username: '',
	userId: '',
	lobbyId: '',
	setUsername: (username: string) => {},
});

function Layout(): JSX.Element {
	const [username, setUsername] = useState<string>('Foo Bar');
	const [userId, setUserId] = useState<string>('633c71d566f605851babba39');
	const [lobbyId, setLobbyId] = useState<string>('633c71d566f605851babba3e');
	
	const handleSetUsername = (username: string) => {
		setUsername(username);
	}

	// modal should be here somewhere
	return (
		<UserContext.Provider value={{username, setUsername: handleSetUsername, userId, lobbyId}}>
			<Box sx={gridContainer}>
				<Box sx={videoContainer}>
					<Video videoId='rokGy0huYEA'></Video>
				</Box>
				<Box sx={chatContainer}>
					<Chatter></Chatter>
				</Box>
			</Box>
		</UserContext.Provider>
	)
}

const border: SxProps = {
	borderRadius: '2px',
	border: '1px solid'
}

const gridContainer: SxProps = {
	display: 'inline-grid',
	columnGap: 1,
	gridTempateColumns: '3fr 1fr',
	gridTemplateAreas: `
		"video video video chat"
		"video video video chat"
		"video video video chat"
	`,
}

const chatContainer: SxProps = {
	gridArea: 'chat',
	width: '29vw',
	height: 'calc(100vh - 2px)',
	...border
}

const videoContainer: SxProps = {
	gridArea: 'video',
	width: '70vw',
	height: 'calc(100vh - 2px)',
	...border

}

const miscContainer: SxProps = {
	gridArea: 'misc',
	width: '28vw',
	height: '29vh',
	...border

}

export default Layout;
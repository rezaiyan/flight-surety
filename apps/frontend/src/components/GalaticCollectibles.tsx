// Import statements...

import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {
    MouseEvent,
    ReactElement,
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';
import { Provider } from '../utils/provider';
import { SectionDivider } from './SectionDivider';
interface Planet {
    name: string;
    terrain: string;
    rarityLevel: number;
    owner: string;
    status: Status;
    price: number;
}

enum Status { ForSale = "For sale", New = "New" }

const GalacticCollectiblesArtifact = require('../artifacts/contracts/GalacticCollectibles.sol/GalacticCollectibles.json');

const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledActionButton = styled.button`
  width: 180px;
  height: auto;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
  padding: 0.5rem 1rem; /* Adjust the values as needed */
`;

const StyledPlanetList = styled.div`
    margin-top: 20px;
`;

const StyledPlanetCard = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

export function GalacticCollectibles(): ReactElement {
    const context = useWeb3React<Provider>();
    const { library, active } = context;

    const [signer, setSigner] = useState<Signer>();
    const [planetContract, setPlanetContract] = useState<Contract>();
    const [planetContractAddr, setPlanetContractAddr] = useState<string>('');
    const [allPlanets, setAllPlanets] = useState<Planet[]>([]);

    useEffect((): void => {
        if (!library) {
            setSigner(undefined);
            return;
        }

        setSigner(library.getSigner());
    }, [library]);

    useEffect((): void => {
        if (!planetContract) {
            return;
        }

    }, [planetContract]);


    useEffect(() => {

        if (!signer) {
            return;
        }

        if (planetContract) {
            const contractWithSigner = planetContract.connect(signer);

            // Listen for events
            contractWithSigner.on("Created", (tokenId, event) => {
                console.log(`Planet Created - Token ID: ${tokenId}`);
                fetchPlanets(contractWithSigner);
                window.alert(`🌍 Planet ${tokenId} created successfully! 🚀`);
                // Update state or perform any other action
            });

            contractWithSigner.on("Sold", (tokenId, event) => {
                console.log(`Planet Sold - Token ID: ${tokenId}`);
                fetchPlanets(contractWithSigner);
                window.alert(`🌌 Planet ${tokenId} purchased successfully! 🛍️`);
                // Update state or perform any other action
            });

            contractWithSigner.on("UpforSale", (tokenId, event) => {
                console.log(`Planet Up for Sale - Token ID: ${tokenId}`);
                fetchPlanets(contractWithSigner);
                window.alert(`🛍️ Planet ${tokenId} put for sale successfully! 💸`);
                // Update state or perform any other action
            });

            contractWithSigner.on("Exchanged", (tokenId1, tokenId2, event) => {
                console.log(`Planets Exchanged - Token ID 1: ${tokenId1}, Token ID 2: ${tokenId2}`);
                fetchPlanets(contractWithSigner);
                window.alert(`🔄 Planets ${tokenId1} and ${tokenId2} exchanged successfully!`);
                // Update state or perform any other action
            });

            contractWithSigner.on("Transfered", (tokenId, event) => {
                console.log(`Planet Transferred - Token ID: ${tokenId}`);
                fetchPlanets(contractWithSigner);
                window.alert(`🌌 Planet ${tokenId} transferred successfully!`);
                // Update state or perform any other action
            });

            contractWithSigner.on("Burned", (tokenId, event) => {
                console.log(`Planet Burned - Token ID: ${tokenId}`);
                fetchPlanets(contractWithSigner);
                window.alert(`🔥 Planet ${tokenId} burned successfully!`);
                // Update state or perform any other action
            });

            // Cleanup event listeners when the component is unmounted
            return () => {
                contractWithSigner.removeAllListeners();
            };
        }
    }, [planetContract, signer]);



    async function handleDeployContract(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        // only deploy the GalacticCollectibles contract one time, when a signer is defined
        if (planetContract || !signer) {
            return;
        }

        async function deployPlanetContract(signer: Signer): Promise<void> {
            const GalacticCollectibles = new ethers.ContractFactory(
                GalacticCollectiblesArtifact.abi,
                GalacticCollectiblesArtifact.bytecode,
                signer
            );

            try {
                const planetContract = await GalacticCollectibles.deploy();
                await planetContract.deployed();
                window.alert(`🚀 Galactic Collectibles Contract Deployed to: ${planetContract.address} 🌌`);

                setPlanetContract(planetContract);
                setPlanetContractAddr(planetContract.address);
            } catch (error: any) {
                window.alert(
                    'Error!' + (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        deployPlanetContract(signer);
    }


    async function handleDestroyContract(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer || !planetContract) {
            window.alert('👽 Signer or Contract not available 👽');
            return;
        }

        try {
            await planetContract.selfDestroy();
            setPlanetContract(undefined);
            setPlanetContractAddr('');
            window.alert('🔥 Galactic Collectibles Contract destroyed!');
        } catch (error: any) {
            window.alert(
                'Error destroying contract!' +
                (error && error.message ? `\n\n${error.message}` : '')
            );
        }
    }

    async function handleBurnPlanet(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer || !planetContract) {
            window.alert('👽 Signer or Contract not available 👽');
            return;
        }

        const tokenIdInput = prompt('Enter Token ID for Planet to burn') || '0';

        // Validate inputs
        if (isNaN(parseInt(tokenIdInput))) {
            window.alert('Invalid input. Please provide valid data. 🛑');
            return;
        }

        const tokenId = parseInt(tokenIdInput);

        try {
            await planetContract.burn(tokenId);
        } catch (error: any) {
            window.alert(
                'Error burning planet!' +
                (error && error.message ? `\n\n${error.message}` : '')
            );
        }
    }

    async function fetchPlanets(contractWithSigner: Contract) {
        try {
            const fetchedPlanets = await contractWithSigner?.getAllPlanets();
            setAllPlanets(fetchedPlanets || []);
        } catch (error: any) {
            console.error('Error fetching planets:', error);
        }
    }

    async function handleCreatePlanet(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }

        async function createPlanet(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = planetContract?.connect(signer);

                const planetNameInput = prompt('Enter the name of your new planet 🪐') || '';
                const terrainInput = prompt('What type of terrain does your planet have? 🏞️') || '';
                const rarityLevelInput = prompt('Enter rarity level (1-10) 🌟') || '0';
                const tokenIdInput = prompt('Choose an ID for your planet (must be unique) 🆔') || '0';

                // Validate inputs
                if (!planetNameInput || !terrainInput || isNaN(parseInt(rarityLevelInput)) || isNaN(parseInt(tokenIdInput))) {
                    window.alert('Invalid input. Please provide valid data. 🛑');
                    return;
                }

                const planetName = planetNameInput;
                const terrain = terrainInput;
                const rarityLevel = parseInt(rarityLevelInput);
                const tokenId = parseInt(tokenIdInput);

                await contractWithSigner?.createPlanet(planetName, terrain, rarityLevel, tokenId);
            } catch (error: any) {
                window.alert(
                    'Error creating planet!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        createPlanet(signer);
    }

    async function handlePutPlanetForSale(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }

        async function putPlanetForSale(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = planetContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Planet') || '0';
                const priceInput = prompt('Enter sale price in Wei') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput)) || isNaN(parseInt(priceInput))) {
                    window.alert('Invalid input. Please provide valid data. 🛑');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);
                const price = parseInt(priceInput);

                await contractWithSigner?.putPlanetUpForSale(tokenId, price);
            } catch (error: any) {
                window.alert(
                    'Error putting planet for sale!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        putPlanetForSale(signer);
    }

    async function handleBuyPlanet(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }

        async function buyPlanet(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = planetContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Planet') || '0';
                const valueInput = prompt('Enter purchase amount in Wei') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput)) || isNaN(parseInt(valueInput))) {
                    window.alert('Invalid input. Please provide valid data. 🛑');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);
                const value = parseInt(valueInput);

                await contractWithSigner?.buyPlanet(tokenId, { value });
            } catch (error: any) {
                window.alert(
                    'Error purchasing planet!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        buyPlanet(signer);
    }

    async function handleLookUpTokenIdToPlanetInfo(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }

        async function lookUpTokenIdToPlanetInfo(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = planetContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Planet') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput))) {
                    window.alert('Invalid input. Please provide valid data. 🛑');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);
                const [name, terrain, rarityLevel] = await contractWithSigner?.lookUpTokenIdToPlanetInfo(tokenId);
                window.alert(`🪐 Planet Info:\nName: ${name}\nTerrain: ${terrain}\nRarity Level: ${rarityLevel}`);
            } catch (error: any) {
                window.alert(
                    'Error looking up planet info!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        lookUpTokenIdToPlanetInfo(signer);
    }

    async function handleExchangePlanets(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }

        async function exchangePlanets(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = planetContract?.connect(signer);

                const tokenId1Input = prompt('Enter Token ID for Planet 1') || '0';
                const tokenId2Input = prompt('Enter Token ID for Planet 2') || '0';

                // Validate inputs
                if (isNaN(parseInt(tokenId1Input)) || isNaN(parseInt(tokenId2Input))) {
                    window.alert('Invalid input. Please provide valid data. 🛑');
                    return;
                }

                const tokenId1 = parseInt(tokenId1Input);
                const tokenId2 = parseInt(tokenId2Input);

                await contractWithSigner?.exchangePlanets(tokenId1, tokenId2);
            } catch (error: any) {
                window.alert(
                    'Error exchanging planets!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        exchangePlanets(signer);
    }

    async function handleTransferPlanet(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }

        async function transferPlanet(signer: Signer): Promise<void> {
            try {
                const contractWithSigner = planetContract?.connect(signer);

                const tokenIdInput = prompt('Enter Token ID for Planet') || '0';
                const toAddress = prompt('Enter recipient address') || '';

                // Validate inputs
                if (isNaN(parseInt(tokenIdInput)) || !toAddress) {
                    window.alert('Invalid input. Please provide valid data. 🛑');
                    return;
                }

                const tokenId = parseInt(tokenIdInput);

                await contractWithSigner?.transferPlanet(toAddress, tokenId);
            } catch (error: any) {
                window.alert(
                    'Error transferring planet!' +
                    (error && error.message ? `\n\n${error.message}` : '')
                );
            }
        }

        transferPlanet(signer);
    }

    return (
        <>
            {/* Deploy Contract Button */}
            <StyledActionButton
                disabled={!active || planetContract ? true : false}
                style={{
                    cursor: !active || planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || planetContract ? 'unset' : 'blue'
                }}
                onClick={handleDeployContract}
            >
                🚀 Deploy Galactic Collectibles Contract
            </StyledActionButton>

            {/* Contract Address Display */}
            <StyledGreetingDiv>
                <StyledLabel>Contract Address:</StyledLabel>
                <div>
                    {planetContractAddr ? (planetContractAddr) : (<em>{`<Contract not yet deployed>`}</em>)}
                </div>
                <div></div>
            </StyledGreetingDiv>

            {/* Destroy Contract Button */}
            <StyledActionButton
                disabled={planetContract ? false : true}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'red'
                }}
                onClick={handleDestroyContract}
            >
                🔥 Destroy Galactic Collectibles Contract
            </StyledActionButton>

            {/* Burn Planet Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'orange'
                }}
                onClick={handleBurnPlanet}
            >
                🔥 Burn Planet
            </StyledActionButton>

            {/* Section Divider */}
            <SectionDivider />

            {/* Create Planet Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'blue'
                }}
                onClick={handleCreatePlanet}
            >
                🪐 Create Your Own Planet
            </StyledActionButton>

            {/* Put Planet For Sale Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'blue'
                }}
                onClick={handlePutPlanetForSale}
            >
                🛍️ Put Your Planet For Sale
            </StyledActionButton>

            {/* Buy Planet Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'blue'
                }}
                onClick={handleBuyPlanet}
            >
                💸 Buy a Planet
            </StyledActionButton>

            {/* Look Up Planet Info Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'blue'
                }}
                onClick={handleLookUpTokenIdToPlanetInfo}
            >
                🔍 Look Up Planet Info
            </StyledActionButton>

            {/* Exchange Planets Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'blue'
                }}
                onClick={handleExchangePlanets}
            >
                🔄 Exchange Planets
            </StyledActionButton>

            {/* Transfer Planet Button */}
            <StyledActionButton
                disabled={!active || !planetContract}
                style={{
                    cursor: !active || !planetContract ? 'not-allowed' : 'pointer',
                    borderColor: !active || !planetContract ? 'unset' : 'blue'
                }}
                onClick={handleTransferPlanet}
            >
                🌌 Transfer Your Planet
            </StyledActionButton>
            {/* Display the list of planets */}
            <StyledPlanetList>
                <h2>All Planets</h2>
                {allPlanets.map((planet, index) => (
                    <StyledPlanetCard key={index}>
                        <strong>Name: </strong>{planet.name}<br />
                        <strong>Terrain: </strong>{planet.terrain}<br />
                        <strong>Rarity Level: </strong> {planet.rarityLevel.toString()}<br />
                        <strong>Owner address: </strong>{planet.owner}<br />
                        <strong>Status: </strong>{Object.values(Status)[Number(planet.status)]}<br />
                        <strong>Price: </strong>{Number(planet.status) === 0 ? `${planet.price} gwei` : 'N/A'}
                    </StyledPlanetCard>
                ))}
            </StyledPlanetList>

        </>
    );

}
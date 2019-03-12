import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    VrButton,
    asset,
    AmbientLight,
    PointLight,
    NativeModules
} from 'react-360';

const {AudioModule} = NativeModules;

import Entity from 'Entity';

const DELTA = 10;

export default class React3DView extends React.Component {
    state = {
        rotation: 50
    }

    componentDidMount() {
        setInterval(this._rotate, 50)
        AudioModule.createAudio('boom', {
            source: asset('boom.mp3'),
            is3d: true,
        });
    }

    _rotate = () => {
        let newRotation = this.state.rotation + DELTA;
        if (newRotation > 360) {
            newRotation = 0;
        }
        this.setState({rotation: newRotation});
    }

    playSound() {
        AudioModule.play('boom', {
            position: [3, 0, 0],
        });
    }

    render() {
        return (
            <View>
                <AmbientLight intensity={5}/>
                <PointLight
                    style={{
                        color: 'white',
                        transform: [
                            {translate: [0, 0, 0]}
                        ]
                    }}
                />
                <VrButton
                    onClick={this.playSound}
                    >
                    <Entity
                        source={{
                            obj: asset('camera/camera.obj'),
                            mtl: asset('camera/camera.mtl'),
                        }}
                        lit={true}
                        texture={asset('abs.jpg')}
                        style={{
                            color: "#FFF",
                            transform: [
                                {translate: [0, 0, -30]},
                                {rotateY: `${this.state.rotation}deg`},
                                {scale: 20}
                            ]
                        }}
                    />
                </VrButton>
            </View>
        );
    }
};

AppRegistry.registerComponent('React3DView', () => React3DView);

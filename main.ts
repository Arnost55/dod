function stopCar () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
function moveForward () {
    pins.digitalWritePin(DigitalPin.P12, 1)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
function turnLeft () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
input.onButtonPressed(Button.A, function () {
    // Move forward
    if (!(autoMode)) {
        moveForward()
    }
})
function autoModeLogic () {
    basic.forever(function () {
        // Read obstacle avoidance sensors
        let obstacleLeft = pins.digitalReadPin(DigitalPin.P1);
        let obstacleRight = pins.digitalReadPin(DigitalPin.P2);

        // Both sensors detect an obstacle
        if (obstacleLeft == 0 && obstacleRight == 0) {
            // Stop and turn around
            moveBackward();
            basic.pause(500);
            turnRight();
            basic.pause(500);
        } else if (obstacleLeft == 0) {
            // Obstacle detected on the left, turn right
            turnRight();
        } else if (obstacleRight == 0) {
            // Obstacle detected on the right, turn left
            turnLeft();
        } else {
            // No obstacle, move forward
            moveForward();
        }

        basic.pause(100); // Adjust the pause time based on your car's speed and responsiveness
    });
}
input.onButtonPressed(Button.AB, function () {
    // Toggle auto mode
    autoMode = !(autoMode)
    if (autoMode) {
        basic.showIcon(IconNames.Yes)
        autoModeLogic()
    } else {
        basic.clearScreen()
        stopCar()
    }
})
function turnRight () {
    pins.digitalWritePin(DigitalPin.P12, 1)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
input.onButtonPressed(Button.B, function () {
    // Move backward
    if (!(autoMode)) {
        moveBackward()
    }
})
function moveBackward () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.digitalWritePin(DigitalPin.P0, 1)
}
let autoMode = false
basic.forever(function () {
	
})

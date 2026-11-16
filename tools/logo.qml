import QtQuick

// A piece of the logo as a picture with no ground, in the colours of the website.
// make-logo.sh puts the rows in place of @LOGO@, the font size in @SIZE@ and the
// output path in @OUT@.
Window {
    id: win
    visible: true
    width: 1600; height: 1000
    color: "transparent"

    readonly property color top: "#e8fbff"
    readonly property color ghost: "#81d3de"
    readonly property var rows: @LOGO@

    // No background item: grabToImage then keeps the alpha channel.
    Column {
        anchors.centerIn: parent
        Repeater {
            model: win.rows
            Text {
                required property int index
                required property string modelData
                anchors.horizontalCenter: parent.horizontalCenter
                text: modelData
                textFormat: Text.PlainText
                color: Qt.tint(win.top, Qt.rgba(win.ghost.r, win.ghost.g, win.ghost.b, index / Math.max(1, win.rows.length - 1)))
                font.family: "JetBrainsMono NF"
                font.pixelSize: @SIZE@
            }
        }
    }

    Timer {
        interval: 800; running: true
        onTriggered: win.contentItem.grabToImage(function (r) {
            r.saveToFile("@OUT@"); Qt.exit(0)
        })
    }
}

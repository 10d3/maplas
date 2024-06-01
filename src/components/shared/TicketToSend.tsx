/* eslint-disable jsx-a11y/alt-text */
import { CheckCheckIcon, MapPinIcon } from 'lucide-react';
import QrCodetoImage from '@/components/shared/qrcode';
import { formatDateTime } from '@/lib/utils';
import { sendPDF } from '@/lib/actions/resend-email';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

interface blaProps {
  ticket: any;
  event: any;
  session: any;
}

const styles = StyleSheet.create({
  ticketContainer: {
    backgroundColor: '#6c47b8',
    color: 'white',
    width: '80%',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
    marginTop: '20px',
    padding: '10px'
  },
  innerContainer: {
    padding: '20px'
  },
  eventImage: {
    objectFit: 'contain',
    borderRadius: '10px',
    width: '320px',
    height: '120px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontSize: '12px',
    opacity: 0.7
  },
  section: {
    backgroundColor: '#8f7ad3',
    padding: '20px'
  },
  sectionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dashed white',
    paddingBottom: '10px',
    marginBottom: '10px'
  },
  icon: {
    width: '24px',
    height: '24px'
  },
  centerText: {
    textAlign: 'center',
    opacity: 0.7,
    marginTop: '10px'
  }
});
const Ticket = ({ ticket, event, session }:blaProps) => {
  const imageE = ticket.eventImage;
  const imageB = ticket.qrCodePath;
  const dateS = event.startDate;

  return (
    <Document>
      <Page size="A4" style={{ padding: '30px' }}>
        <View style={styles.ticketContainer}>
          <View style={styles.innerContainer}>
            <Image src={imageE} style={styles.eventImage}/>
            <Text style={styles.title}>
              {ticket.eventName}
              {ticket.isVIPticket ? (
                <CheckCheckIcon style={styles.icon} />
              ) : null}
            </Text>
            <Text style={styles.subtitle}>{event.createdBy.name}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionItem}>
              <View>
                <Text style={styles.subtitle}>Location</Text>
                <Text>{event.location}</Text>
              </View>
              <MapPinIcon style={styles.icon} />
            </View>
            <View style={styles.sectionItem}>
              <View>
                <Text style={styles.subtitle}>Name</Text>
                <Text>{session.user.name}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Date</Text>
                <Text>{formatDateTime(dateS).dateOnly}</Text>
              </View>
            </View>
            <View style={styles.sectionItem}>
              <View>
                <Text style={styles.subtitle}>Time</Text>
                <Text>{formatDateTime(dateS).timeOnly}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Dresscode</Text>
                <Text>Halloween</Text>
              </View>
            </View>
          </View>
          <View style={styles.centerText}>
            <Text>SCAN BARCODE</Text>
            <QrCodetoImage imageB={imageB} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Ticket;